const config = {
    baseUrl: 'https://bookstore.demoqa.com',
    credential: {
        userName: 'GHJFYqo' + Math.floor(Math.random() * 99999),
        password: 'BCVNaaa!' + Math.floor(Math.random() * 99999),
    },
    loginNotExist: '59ghfdds444444',
    passwordWrong: 'BCVNaaa',
    generateCredential: () => {
        const user = {
            userName: 'GHJFYqh' + Math.floor(Math.random() * 99999),
            password: 'BCVNaaa!' + Math.floor(Math.random() * 99999),
        };
        return user
    },
};

export default config;
