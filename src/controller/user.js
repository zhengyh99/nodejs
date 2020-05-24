
const loginCheck = (username, password) => {
    if (username === 'xixi' && password === '321') {
        return true
    }
    return false
}

module.exports = { loginCheck }