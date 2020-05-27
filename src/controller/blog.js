const { exec } = require('../db/mysql')

const getlist = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }
    console.log('sql:', sql)
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`
    console.log('sql:', sql)
    return exec(sql)
}

const newBlog = (blogData = {}) => {
    console.log("blog data:", blogData)
    const { title, content, author } = blogData
    const now = new Date().getTime()
    let sql = `insert into blogs (title,content,createtime,author) values('${title}','${content}',${now},'${author}')`
    console.log('sql:', sql)
    return exec(sql).then(resd => {
        console.log("insert info:", res)
        return { id: resd.insertId }
    })
}

const updBlog = (blogData = {}) => {
    console.log("update blog:", blogData)
    const { id, title, content, author } = blogData
    let sets = ''

    if (title) {
        sets += `title='${title}'`
    } else {
        sets += 'title=title'
    }
    if (content) {
        sets += `,content='${content}'`
    }
    if (author) {
        sets += `,author='${author}'`
    }
    let sql = `update blogs set ${sets} where id=${id}`
    console.log('sql:', sql)
    return exec(sql).then(res => {
        console.log('update info:', res)
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = ((blogdata={}) => {
    const { id, author } = blogData
    console.log("delete blog No: ", id)
    let sql = `delete from  blogs where id=${id} and author ='${author}'`
    console.log('sql:', sql)
    return exec(sql).then(res => {
        console.log('delete info:', res)
        if (res.affectedRows > 0) {
            return true
        }
        return false
    })
})

module.exports = { getlist, getDetail, newBlog, updBlog, delBlog }