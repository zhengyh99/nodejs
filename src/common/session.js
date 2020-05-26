const { getExpires } = require("./cookie")
const SESSION_DATA = {}
const initSession = (req, res) => {
    let sessionId = req.cookie.sessionId
    if (sessionId) {
        if (!SESSION_DATA[sessionId]) {
            SESSION_DATA[sessionId] = {}
        }
    } else {
        sessionId = `${Date.now()}_${Math.random()}`
        res.setHeader('Set-Cookie', `sessionId=${sessionId};path=\;httpOnly;expires=${getExpires()}`)
        SESSION_DATA[sessionId] = {}
    }
    req.session = SESSION_DATA[sessionId]
}

module.exports = { initSession }