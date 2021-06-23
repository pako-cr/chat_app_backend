const Message = require("../models/message")
const User = require("../models/user")

const userConnected = async(uid = '') => {
    const user = await User.findById(uid)
    user.online = true
    await user.save()
    return user
}

const userDisconnected = async(uid = '') => {
    const user = await User.findById(uid)
    user.online = false
    await user.save()
    return user
}

const saveMessage = async(payload) => {
    try {
        const message = new Message(payload)
        await message.save()

        return true
    } catch (ex) {
        console.log('❌ An error occurred saving the message in the DB. Description: ' + ex)
    }
}

module.exports = {
    userConnected,
    userDisconnected,
    saveMessage
}