const { login } = require('../controller/user')
const {getExpires}  = require('../common/cookie')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    //解析请求方法
    const method = req.method
    if (method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query
        return login(username, password)
            .then(rData => {
                if (rData.username) {
                    req.session.username = rData.username
                    req.session.realname = rData.realname
                    return new SuccessModel('登陆成功')
                } else {
                    return new ErrorModel('登陆失败')
                }

            })

    }
    if (method === 'GET' && req.path === '/api/user/login-test') {
        console.log('session:',req.session)
        if (req.session.username) {
            return Promise.resolve(new SuccessModel(`${req.session.username}:${req.session.realname},在线`))
        }
        return Promise.resolve(new ErrorModel('无登陆信息'))

    }

}

module.exports = handleUserRouter