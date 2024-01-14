import config from '../framework/config/config';
import user from '../framework/services/user';

const { credential, loginNotExist, passwordWrong } = config;

describe('API tests - Authorized, Delete, User`s info', () => {
    it('Получение пользователя: успешно', async () => {
        const response = await user.getUser(credential);

        expect(response.status).toEqual(200);
        expect(response.body.username).toEqual(credential.userName);
    });

    it('Запрос статуса - пользователь авторизован: успешно', async () => {
        await user.toAuthorize(credential);
        const res = await user.requestIsAuthorized(credential);

        expect(res.status).toEqual(200);
        expect(res.body).toEqual(true);
    });

    it('Запрос статуса - пользователь авторизован: пользователь не найден', async () => {
        const res = await user.requestIsAuthorized({
            userName: loginNotExist,
            password: passwordWrong,
        });

        expect(res.status).toEqual(404);
        expect(res.body.message).toEqual('User not found!');
    });

    it('Запрос статуса - пользователь авторизован: пустой JSON', async () => {
        const res = await user.requestIsAuthorized({});

        expect(res.status).toEqual(400);
        expect(res.body.message).toEqual('UserName and Password required.');
    });

    it('Удаление пользователя: успешное', async () => {
        const response = await user.deleteUser(credential);

        expect(response.status).toEqual(200);
        // expect(response.body.message).toEqual(creds.userName);
    });
});
