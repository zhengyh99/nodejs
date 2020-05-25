const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')
const queryString = require('querystring')

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}
const serverHandle = (req, res) => {
    //设置响应头
    res.setHeader('Content-type', 'application/json')
    const url = req.url
    //网站路径
    req.path = url.split('?')[0]
    //解析网站请求
    req.query = queryString.parse(url.split('?')[1])


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
        if (userData) {
            userData.then(rdata => {
                console.log('rdata:', rdata)
                res.writeHeader(404, { 'Content-type': 'text/plain' })
                if (rdata.data.length > 0) { 
                    res.write('登陆成功')
                } else {
                    res.write('登陆失败')
                }
                res.end()
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