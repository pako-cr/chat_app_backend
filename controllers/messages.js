const Message = require('../models/message')

const getChat = async(request, response) => {
    const myId = request.uid
    const messageFrom = request.params.from

    const messages = await Message.find({
            $or: [{ from: myId, to: messageFrom }, { from: messageFrom, to: myId }]
        })
        .sort({ createdAt: 'desc' })
        .limit(30)

    response.json({
        ok: true,
        messages
    })
}

module.exports = {
    getChat
}