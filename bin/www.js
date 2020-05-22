const http = require('http')
const POST = 8000
const serverHandel = require('../app')
const server = http.createServer(serverHandel)
server.listen(port)