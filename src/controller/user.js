const { exec } = require('../db/mysql')
const loginCheck = (username, password) => {
    const sql = `select * from users where username='${username}' and password='${password}'`
    console.log('sql:', sql)
    return exec(sql)
}

module.exports = { loginCheck }