const handleUserRouter = (req,res) =>{
    const method = req.method
    const url = req.url
    const path = url.split('?')[0]
    if(method === 'GET' && path==='api/user/login'){
        return {
            msg:'用户登陆'
        }
    }
    
}

module.exports = handleBlogRouter