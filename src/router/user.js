const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    //解析请求方法
    const method = req.method
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        return loginCheck(username, password)
        .then(res=>{
            return new SuccessModel(res)
        })
        .catch(err=>{
            return new ErrorModel('登陆失败')
        })
    }

}

module.exports = handleUserRouter