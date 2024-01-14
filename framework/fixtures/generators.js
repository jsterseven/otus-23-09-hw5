const userGenerator = {
    randomemizeNumber() {
        return Math.floor(Math.random() * 99999);
    },
    generateUserName() {
        return 'GHJFYqo' + this.randomemizeNumber();
    },

    generateUserPassword() {
        return 'BCVNaaa!' + this.randomemizeNumber();
    },

    generateCredential() {
        const user = {
            userName: this.generateUserName(),
            password: this.generateUserPassword(),
        };
        return user;
    },
};

export default userGenerator;
