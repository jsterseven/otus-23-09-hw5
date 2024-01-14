import supertest from 'supertest';
import config from '../config/config';

const { baseUrl } = config;

const book = {
    book: async (credential) => {
        return await supertest(baseUrl)
            .post('/Account/v1/User')
            .send(credential);
    },

    async addBookToUser(credential, isbn) {
        return await supertest(baseUrl)
            .post('/BookStore/v1/Books')
            .send({
                userId: credential.userId,
                collectionOfIsbns: [
                    {
                        isbn: isbn
                    },
                ],
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.token}`);
    },

    async getBook(credential, isbn) {
        console.log(credential.token);
        return await supertest(baseUrl)
            .get(`/BookStore/v1/Book?ISBN=${isbn}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.token}`);
    },

    async updateBook(credential, isbn, newIsbn) {
        return await supertest(baseUrl)
            .put(`/BookStore/v1/Books/${isbn}`)
            .send({
                isbn: newIsbn,
                userId: credential.userId,
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.token}`);
    },

    async deleteBook(credential, isbn) {
        return await supertest(baseUrl)
            .delete(`/BookStore/v1/Book`)
            .send({
                isbn: isbn,
                userId: credential.userId,
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${credential.token}`);
    },
};

export default book;
