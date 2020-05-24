const { getlist, getDetail, newBlog, updBlog,delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    //解析请求方法
    const method = req.method
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getlist(author, keyword)
        return new SuccessModel(listData)
    }
    if (method === 'GET' && req.path === '/api/blog/detail') {

        const data = getDetail(req.body)
        return new SuccessModel(data)
    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        console.log("/api/blog/new")
        const data = newBlog(req.body)
        return new SuccessModel(data)
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        console.log('/api/blog/update')
        const data = updBlog(1, req.body)
        if (data) {
            return new SuccessModel('更新成功！')
        } else {
            return new ErrorModel('更新失败')
        }
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        console.log('/api/blog/del')
        const data = delBlog(2)
        if (data){
            return new SuccessModel('删除成功！')
        }else{
            return new ErrorModel('删除失败！')
        }
    }
}

module.exports = handleBlogRouter