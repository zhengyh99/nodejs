const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    //请求方法
    console.log('method:', req.method)
    if (req.method == 'POST') {
        console.log('content-type:', req.headers['content-type'])
        let postdata = ''
        req.on('data', chunk => {
            postdata += chunk.toString()
        })
        req.on('end', () => {
            console.log('post data:', postdata)
            res.end("post data")
        })
    } else if (req.method == 'GET') {
        //请求url
        const url = req.url
        console.log('url:', url)
        //解析querystring
        req.query = querystring.parse(url.split('?')[1])
        console.log('query list:', req.query)
        const resdata = {
            url,
            path:url.split('?')[0],
            method:req.method,
            query:req.query,            
        }
        res.setHeader('Content-type','application/json')
        res.end(JSON.stringify(resdata))

    }
})
server.listen(8000)
console.log('server running in port:8000')