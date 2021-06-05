const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')


const createUser = async(request, response) => {
    const { email, password } = request.body

    try {
        const userExist = await User.findOne({ email })

        if (userExist) {
            return response.status(400).json({
                ok: false,
                msg: 'The email is not valid. Please try again with a valid email.'
            })
        }

        const user = new User(request.body)

        // Encrypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        // Generar mi JWT
        const token = await generateJWT(user._id)

        response.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(`❌  An error occurred: ${error}.`)
        response.status(500).json({
            ok: false,
            msg: 'Unexpected error occurred. Please try again.'
        })
    }
}

const loginUser = async(request, response) => {
    const { email, password } = request.body

    try {
        const userDB = await User.findOne({ email })

        if (!userDB) {
            return response.status(404).json({
                ok: false,
                msg: 'The email is not valid. Please try again with a valid email.'
            })
        }

        // Validate password
        const validPassword = bcrypt.compareSync(password, userDB.password)

        if (!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: 'Invalid credentials.'
            })
        }

        // Generar mi JWT
        const token = await generateJWT(userDB._id)

        response.json({
            ok: true,
            user: userDB,
            token
        })

    } catch (error) {
        console.log(`❌  An error occurred: ${error}.`)
        response.status(500).json({
            ok: false,
            msg: 'Unexpected error occurred. Please try again.'
        })
    }
}

// const renewUserToken = async(request, response) => {
//     response.json({
//         ok: true,
//         uid: request.uid
//     })
// }

const renewUserToken = async(request, response) => {
    const { uid } = request.body

    try {
        const userDB = await User.findOne({ id: uid })

        if (!userDB) {
            return response.status(404).json({
                ok: false,
                msg: 'The email is not valid. Please try again with a valid email.'
            })
        }

        // Generar mi JWT
        const token = await generateJWT(userDB._id)

        response.json({
            ok: true,
            user: userDB,
            token
        })


    } catch (error) {
        console.log(`❌  An error occurred: ${error}.`)
        response.status(500).json({
            ok: false,
            msg: 'Unexpected error occurred. Please try again.'
        })
    }
}

module.exports = { createUser, loginUser, renewUserToken }