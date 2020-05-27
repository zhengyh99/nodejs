const { login } = require('../controller/user')
const { set, get } = require('../db/redis')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleUserRouter = (req, res) => {
    //解析请求方法
    const method = req.method
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        return login(username, password)
            .then(rData => {
                if (rData.username) {
                    req.session.username = rData.username
                    req.session.realname = rData.realname
                    set(req.sessionId, req.session)
                    return new SuccessModel('登陆成功')
                } else {
                    return new ErrorModel('登陆失败')
                }

            })

    }
    if (method === 'GET' && req.path === '/api/user/login-test') {
        console.log('session:', req.session)
        
        get(req.sessionId).then(res=>{
            console.log('session....',res)
            console.log('username:',res.username)
            if(res.username){
                console.log('=-=-=-=')
                return Promise.resolve(new SuccessModel(`${res.username}:${res.realname},在线。。。`))
            }else{
                return Promise.resolve(new ErrorModel('无登陆信息'))
            }
        })
        // if (req.session.username) {
        //     return Promise.resolve(new SuccessModel(`${req.session.username}:${req.session.realname},在线`))
        // }        
    }

}

module.exports = handleUserRouter