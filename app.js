const blogRouter = require('./src/router/blog')
const userRouter = require('./src/router/user')

const serverHandle = (req,res)=>{
    res.setHeader('Content-type','application/json')
    const blogData = blogRouter(req,res)
    if(blogData){
        res.end(
            JSON.stringify(blogData)
        )
        return
    }
    const userData = userRouter(req,res)
    if(userData){
        res.end(
            JSON.stringify(userData)
        )
    }
    res.writeHeade(404,{'Content-type':'text/plain'})
    res.write('404 Not Found!\n')
    res.end()
}
module.exports = serverHandle