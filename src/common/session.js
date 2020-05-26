const { getExpires } = require("./cookie")
const initSession = (req, res) => {
    const sessionId = req.cookie.sessionId
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