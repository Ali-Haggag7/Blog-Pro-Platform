const jwt = require("jsonwebtoken")

// Verify Token
function VerifyToken(req, res, next) {
    const authToken = req.headers.authorization
    if (authToken) {
        const token = authToken.split(" ")[1]
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decodedPayload
            next()
        }
        catch (error) {
            return res.status(401).json({ message: "invalid token, access denied" })
        }
    }
    else {
        return res.status(401).json({ message: "no token provided, access denied" })
    }
}

// Verify Token & Admin
function verityTokenAndAdmin(req, res, next) {
    VerifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()  //  usersRoute.jsفي ملف ال getAllUsersCtrlمعناها يدي الشغل للي بعده اللي هو ال 
        }
        else {
            return res.status(403).json({ message: "not allowed, only admin" })
        }
    })
}

// Verify Token & Only User Himself
function verityTokenAndOnlyUser(req, res, next) {
    VerifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            next()  //  usersRoute.jsفي ملف ال getAllUsersCtrlمعناها يدي الشغل للي بعده اللي هو ال 
        }
        else {
            return res.status(403).json({ message: "not allowed, only user himself" })
        }
    })
}

// Verify Token & Authorization
function verityTokenAndAuthorization(req, res, next) {
    VerifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            return res.status(403).json({ message: "not allowed, only user himself or admin" })
        }
    })
}

module.exports = {
    VerifyToken,
    verityTokenAndAdmin,
    verityTokenAndOnlyUser,
    verityTokenAndAuthorization
}