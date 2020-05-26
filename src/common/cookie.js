const initCookie = (req) => {
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        req.cookie[key] = value
    });
}

const getExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
    return d.toGMTString() 
}
module.exports = { initCookie, getExpires }