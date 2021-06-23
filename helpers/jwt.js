const jwt = require('jsonwebtoken')

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '12h',
        }, (err, token) => {
            if (err) reject('JWT couldnt be generated')

            resolve(token)
        })
    })
}

const validJWT = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY)
        return [true, uid]

    } catch (error) {
        return [false]
    }
}

module.exports = {
    generateJWT,
    validJWT
}