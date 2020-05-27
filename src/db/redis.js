const { REDIS_CONF } = require('../conf/db')

const redis = require('redis')

const rc = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

rc.on('error', err => {
    console.error(err)
})

const set = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    rc.set(key, val, redis.print)
}

const get = (key) => {
    const promise = new Promise((resolve, reject) => {
        rc.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(null)
            }
            try {
                resolve(JSON.parse(val))

            } catch (error) {
                resolve(val)
            }

            console.log(key, ':', val)
        })
    })

    return promise
}

module.exports = { set, get }