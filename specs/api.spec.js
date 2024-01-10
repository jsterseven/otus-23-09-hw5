import config from '../framework/config/config';
import user from '../framework/services/user';

const { credential, passwordWrong } = config;
const userName = credential.userName;

describe('API tests for "Bookstore" app', () => {
    it('Пользователь успешно создается', async () => {
        const res = await user.login(credential);

        expect(res.status).toEqual(201);
        expect(res.body.username).toEqual(credential.userName);
    });

    it('Логин уже используется', async () => {
        const res = await user.login(credential);

        expect(res.status).toEqual(406);
        expect(res.body.message).toEqual('User exists!');
    });

    it('Пароль не подходит по валидации', async () => {
        const res = await user.login({ userName, password: passwordWrong });

        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch(/Passwords must have/);
    });

    it('Успешная генерация токена', async () => {
        const res = await user.requestToken(credential);

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('Success');
    });

    it('Ошибка генерации токена - неверный пароль', async () => {
        const res = await user.requestToken({
            userName,
            password: passwordWrong,
        });

        expect(res.body.status).toEqual('Failed');
    });
});

describe('API tests - Authorized, Delete, User`s info', () => {
    it('Запрос статуса - пользователь авторизован: успешно', async () => {
        await user.toAuthorize(credential);
        const res = await user.requestAuthorized(credential);

        expect(res.status).toEqual(200);
        expect(res.body).toEqual(true);
    });

    it('Запрос статуса - пользователь авторизован: пользователь не найден', async () => {
        const res = await user.requestAuthorized({
            userName: config.loginNotExist,
            password: passwordWrong,
        });

        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('User not found!');
    });

    it('Запрос статуса - пользователь авторизован: пустой JSON', async () => {
        const res = await user.requestAuthorized({});

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('UserName and Password required.');
    });

    it('Получение пользователя: успешно', async () => {
        const creds = config.generateCredential();
        const response = await user.getUser(creds);

        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual(creds.userName);
    });

    it('Удаление пользователя: успешное', async () => {
        const creds = config.generateCredential();
        const response = await user.deleteUser(creds);

        expect(response.status).toEqual(204);
        // expect(response.body.message).toEqual(creds.userName);
    });
});
