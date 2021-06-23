const { response } = require('express')
const User = require('../models/user')

const getUsers = async(request, response) => {

    const users = await User
        .find({ _id: { $ne: request.uid } })
        .sort('-online')
        .limit(10)

    try {
        response.json({
            ok: 'ok',
            users

        })
    } catch (error) {
        console.log(`❌  An error occurred: ${error}.`)
        response.status(500).json({
            ok: false,
            msg: 'Unexpected error occurred getting users. Please try again.'
        })
    }
}

module.exports = {
    getUsers
}