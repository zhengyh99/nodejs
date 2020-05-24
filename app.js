const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')
const queryString = require('querystring')

const getPostData = (req)=>{
    const promise = new Promise((resolve,reject)=>{
        if(req.method !=='POST'){
            resolve({})
            return 
        }
        if(req.headers['content-type'] !=='application/json'){
            resolve({})
            return 
        }
        let postData = ''
        req.on('data',chunk=>{
            postData += chunk.toString()
        })
        req.on('end',()=>{
            if(!postData){
                resolve({})
                return 
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}
const serverHandle = (req,res)=>{
    //设置响应头
    res.setHeader('Content-type','application/json')
    const url = req.url
    //网站路径
    req.path = url.split('?')[0]
    //解析网站请求
    req.query = queryString.parse(url.split('?')[1])
    //blog 路由分支
    
    getPostData(req).then(postData=>{
        console.log('post data:',postData)
        req.body = postData
        const blogData = blogRouter(req,res)
        if(blogData){
            res.end(
                JSON.stringify(blogData)
            )
            return
        }
        //user 路由分支
        const userData = userRouter(req,res)
        if(userData){
            res.end(
                JSON.stringify(userData)
            )
            return 
        }
        //无路由
        res.writeHeader(404,{'Content-type':'text/plain'})
        res.write('404 Not Found!\n')
        res.end()
    })
    
}
module.exports = serverHandle