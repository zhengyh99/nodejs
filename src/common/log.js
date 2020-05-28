const fs = require('fs')
const path = require('path')

const createWriteStream = (fileName) => {
    const fullFileName = path.join(__dirname, "../../logs", fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

const writeLog = (writeStream, log) => {
    writeStream.write(log + '\n')
}
const accessWriteStream = createWriteStream('access.log')

const accessLog = (log) => {
    writeLog(accessWriteStream, log)
}

module.exports = { accessLog }