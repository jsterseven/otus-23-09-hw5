import config from '../framework/config/config';
import user from '../framework/services/user';
import book from '../framework/services/book';
import listOfBooksIsbn from '../framework/fixtures/listOfBooksIsbn';

const { bookOne, bookTwo } = listOfBooksIsbn;

describe('API tests - CRUD for books', () => {
    let creds = {};
    let userIdAndToken = {};
    it('Добавление книги пользователю: успешно', async () => {
        creds = config.credential;
        userIdAndToken = await user.getUserIdAndToken(creds);
        const response = await book.addBookToUser(userIdAndToken, bookOne);

        expect(response.status).toEqual(201);
        expect(response.body.books[0].isbn).toEqual(bookOne);
    });

    it('Получить инфо о книге: успешно', async () => {
        const response = await book.getBook(userIdAndToken, bookOne);

        expect(response.status).toEqual(200);
        expect(response.body.isbn).toEqual(bookOne);
    });

    it('Обновить книгу у пользователя: успешно', async () => {
        const response = await book.updateBook(
            userIdAndToken,
            bookOne,
            bookTwo
        );

        expect(response.status).toEqual(200);
        expect(response.body.books[0].isbn).toEqual(bookTwo);
    });

    it('Удалить книгу у пользователя: успешно', async () => {
        const response = await book.deleteBook(userIdAndToken, bookTwo);

        expect(response.status).toEqual(204);
    });

    describe('Параметризированные тесты для "Получить инфо о книге" API', () => {
        describe.each`
            bookISNB   | expected
            ${bookOne} | ${bookOne}
            ${bookTwo} | ${bookTwo}
            ${123}     | ${'code'}
            ${'abc'}   | ${'code'}
            ${''}      | ${'code'}
            ${' '}     | ${'code'}
        `('Книга - $bookISNB', ({ bookISNB, expected }) => {
            test(`Книга c ISBN ${bookISNB} возвращает "${expected}" в ответе`, async () => {
                const response = await book.getBook(userIdAndToken, bookISNB);
                if (expected === 'code') {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(response.body.code).toEqual('1205');
                } else {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(response.body.isbn).toEqual(expected);
                }
            });
        });
    });
});
