const getlist = (author, keyword) => {
    return [
        {
            id: 1,
            title: "标题A",
            content: "内容A",
            createTime: 1590248780801,
            author: "作家A"
        },
        {
            id: 2,
            title: "标题B",
            content: "内容B",
            createTime: 1590248895845,
            author: "作家B"
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: "标题A",
        content: "内容A",
        createTime: 1590248780801,
        author: "作家A"
    }
}

const newBlog = (blogData = {}) => {
    console.log("blog data:", blogData)
    return {
        id: 3
    }
}

const updBlog = (id, blogData = {}) => {
    console.log("update blog:", id, blogData)
    return false
}

const delBlog = (id=>{
    console.log("delete blog No: ",id)
    return false
})

module.exports = { getlist, getDetail, newBlog, updBlog, delBlog }