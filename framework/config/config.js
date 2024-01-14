import userGenerator from '../fixtures/generators';

const config = {
    baseUrl: 'https://bookstore.demoqa.com',
    credential: userGenerator.generateCredential(),
    loginNotExist: '59ghfdds444444',
    passwordWrong: 'BCVNaaa',
};

export default config;
