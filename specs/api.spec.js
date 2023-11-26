import supertest from 'supertest';

const BASE_URL = 'https://bookstore.demoqa.com';
const userName = 'GHJFDDS' + Math.floor(Math.random() * 99999);
const passwordWrong = 'BCVNaaa!';
const password = 'BCVNaaa!' + Math.floor(Math.random() * 99999);

describe('API tests for "Bookstore" app', () => {
    it('Пользователь успешно создается', async () => {
        const res = await supertest(BASE_URL)
        .post('/Account/v1/User')
        .send({ userName: userName, password: password });

        expect(res.status).toEqual(201);
        expect(res.body.username).toEqual(userName);
    });

    it('Логин уже используется', async () => {
        const res = await supertest(BASE_URL)
        .post('/Account/v1/User')
        .send({ userName: userName, password: password });

        expect(res.status).toEqual(406);
        expect(res.body.message).toEqual('User exists!');
    });

    it('Пароль не подходит по валидации', async () => {
        const res = await supertest(BASE_URL)
        .post('/Account/v1/User')
        .send({ userName: userName, password: passwordWrong });

        expect(res.status).toEqual(400);
        expect(res.body.message).toMatch(/Passwords must have/);
    });

    it('Успешная генерация токена', async () => {
        const res = await supertest(BASE_URL)
        .post('/Account/v1/GenerateToken')
        .send({ userName: userName, password: password });

        expect(res.status).toEqual(200);
        expect(res.body.status).toEqual('Success');
    });

    it('Ошибка генерации токена - неверный пароль', async () => {
        const res = await supertest(BASE_URL)
        .post('/Account/v1/GenerateToken')
        .send({ userName: userName, password: passwordWrong });

        expect(res.body.status).toEqual('Failed');
    });
});
