const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    //解析请求方法
    const method = req.method
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        return loginCheck(username, password)
            .then(res => {
                if (res.username) {
                    return new SuccessModel('登陆成功')
                } else {
                    return new ErrorModel('登陆失败')
                }

            })

    }

}

module.exports = handleUserRouter