const { initCookie,getExpires } = require("./cookie")
const SESSION_DATA = {}
const initSession = (req, res) => {
    initCookie(req)
    req.sessionId = req.cookie.sessionId
    if (req.sessionId) {
        if (!SESSION_DATA[req.sessionId]) {
            SESSION_DATA[req.sessionId] = {}
        }
    } else {
        req.sessionId = `${Date.now()}_${Math.random()}`
        res.setHeader('Set-Cookie', `sessionId=${req.sessionId};path=\;httpOnly;expires=${getExpires()}`)
        SESSION_DATA[req.sessionId] = {}
    }
    
    req.session = SESSION_DATA[req.sessionId]
}

module.exports = { initSession }