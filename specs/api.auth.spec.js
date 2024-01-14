import config from '../framework/config/config';
import user from '../framework/services/user';

const { credential, passwordWrong } = config;
const userName = credential.userName;

describe('API auth tests for "Bookstore" app', () => {
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
