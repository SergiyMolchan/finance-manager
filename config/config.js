const dbLogin = {
    login: 'Sergiy',
    password: 'q1w2e3r4'
}
module.exports = {
    mongoURL: `mongodb+srv://${dbLogin.login}:${dbLogin.password}@cluster0-zpnrt.mongodb.net/finance-manager`,
    jwt: 'secret',
    PORT: 4000
}