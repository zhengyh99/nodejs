const { login } = require('../controller/user')
const {getExpires}  = require('../common/cookie')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    //解析请求方法
    const method = req.method
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        return login(username, password)
            .then(rData => {
                if (rData.username) {
                    res.setHeader('Set-Cookie', `username=${rData.username};path=/;httpOnly;expires=${getExpires()}`)
                    return new SuccessModel('登陆成功')
                } else {
                    return new ErrorModel('登陆失败')
                }

            })

    }
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel(`${req.cookie.username},在线`))
        }
        return Promise.resolve(new ErrorModel('无登陆信息'))

    }

}

module.exports = handleUserRouter