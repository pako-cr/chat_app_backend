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

module.exports = {
    generateJWT
}