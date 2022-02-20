module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 13
    },
    rules: {
        /*
        The following two rules will stay until a proper
        module system has been implemented.
        */
        'no-undef': 0,
        'no-unused-vars': 0
    }
};
