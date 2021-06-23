const { validJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', async client => {
    console.log('✅ Client connected');

    const [validToken, uid] = validJWT(client.handshake.headers['x-token'])

    client.on('disconnect', () => {
        console.log('❌ Client disconnected');
        userDisconnected(uid)
    });

    if (!validToken) return client.disconnect()

    console.log('✅ Client authenticated');
    userConnected(uid)

    client.join(uid)

    client.on('private-message', async(payload) => {
        await saveMessage(payload)
        io.to(payload.to).emit('private-message', payload);
    });
});