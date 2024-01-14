import supertest from 'supertest';
import config from '../config/config';

const { baseUrl } = config;

const user = {
    login: async (credential) => {
        return await supertest(baseUrl)
            .post('/Account/v1/User')
            .send(credential);
    },

    async requestToken(credential) {
        return await supertest(baseUrl)
            .post('/Account/v1/GenerateToken')
            .send(credential);
    },

    async toAuthorize(credential) {
        await this.login(credential);
        await this.requestToken(credential);
    },

    async getToken(credential) {
        const res = await this.requestToken(credential);
        return res.body.token;
    },

    async requestIsAuthorized(credential) {
        return await supertest(baseUrl)
            .post('/Account/v1/Authorized')
            .send(credential);
    },

    async getUserIdAndToken(credential) {
        const res = await this.login(credential);
        const userId = await res.body.userID;
        const token = await this.getToken(credential);
        return { userId, token };
    },

    async getUser(credential) {
        const user = await this.getUserIdAndToken(credential);
        return await supertest(baseUrl)
            .get(`/Account/v1/User/${user.userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${user.token}`);
    },

    async deleteUser(credential) {
        const user = await this.getUserIdAndToken(credential);
        return await supertest(baseUrl)
            .delete(`/Account/v1/User/${user.userId}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${user.token}`);
    },
};

export default user;
