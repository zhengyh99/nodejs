const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')
const queryString = require('querystring')
const { getPostData } = require('./src/common/post')
const { initSession } = require('./src/common/session')
const {accessLog} = require('./src/common/log')

const serverHandle = (req, res) => {
    accessLog(`${req.method}--${req.url}--${req.headers['user-agent']}--${Date()}`)
    //设置响应头
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    //网站路径
    req.path = url.split('?')[0]
    //解析网站请求
    req.query = queryString.parse(url.split('?')[1])

    //初始化session
    initSession(req,res)
    //获取post数据 
    getPostData(req).then(postData => {
        //blog 路由分支
        console.log('post data:', postData)
        req.body = postData
        const blogRes = blogRouter(req, res)

        if (blogRes) {
            blogRes.then(rdata => {
                console.log("rdata:", rdata)
                res.end(
                    JSON.stringify(rdata)
                )

            })
            return
        }
        //user 路由分支
        const userData = userRouter(req, res)
        console.log("user data:::::::",userData)
        if (userData) {
            userData.then(rdata => {
                console.log("rdata2:", rdata)
                res.end(
                    JSON.stringify(rdata)
                )
            })
            return
        }
        //无路由
        res.writeHeader(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found!\n')
        res.end()
    })

}
module.exports = serverHandle