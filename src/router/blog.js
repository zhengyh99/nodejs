const { getlist, getDetail, newBlog, updBlog, delBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    //解析请求方法
    const method = req.method
    console.log('method:', method, '\n path:', req.path)
    if (method === 'GET' && req.path === '/api/blog/list') {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        return getlist(author, keyword)
            .then(res => {
                return new SuccessModel(res)
            })
            .catch(err => {
                return new ErrorModel(err)
            })

    }
    if (method === 'GET' && req.path === '/api/blog/detail') {

        return getDetail(req.query.id)
            .then(res => {
                return new SuccessModel(res)
            })
            .catch(err => {
                return new ErrorModel('无数据')
            })

    }
    if (method === 'POST' && req.path === '/api/blog/new') {
        console.log("/api/blog/new")
        return newBlog(req.body)
            .then(res => {
                return new SuccessModel(res)
            })
            .catch(err => {
                return new ErrorModel('数据插入失败！')
            })
    }
    if (method === 'POST' && req.path === '/api/blog/update') {
        console.log('/api/blog/update')
        return updBlog(req.body)
        .then(res => {
            return new SuccessModel(res)
        })
        .catch(err => {
            return new ErrorModel('数据更新失败！')
        })
    }
    if (method === 'POST' && req.path === '/api/blog/del') {
        console.log('/api/blog/del')
        return delBlog(req.body.id)
        .then(res => {
            return new SuccessModel(res)
        })
        .catch(err => {
            return new ErrorModel('数据删除失败！')
        })
    }
}

module.exports = handleBlogRouter