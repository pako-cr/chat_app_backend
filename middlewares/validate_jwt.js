const jwt = require("jsonwebtoken");

const validateJWT = (request, response, next) => {

    const token = request.header('x-token')

    if (!token) return response.status(401).json({
        ok: false,
        msg: 'Session token not found.'
    })

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY)
        request.uid = uid
        next();

    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Session token unavailable.'
        })
    }
}

module.exports = { validateJWT };