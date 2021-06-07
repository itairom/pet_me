

const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}

function connectSockets(http, session) {
    gIo = require('socket.io')(http);

    const sharedSession = require('express-socket.io-session');

    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        // console.log('New socket - socket.handshake.sessionID', socket.handshake.sessionID)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        // if (socket.handshake?.session?.user) socket.join(socket.handshake.session.user._id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })

        socket.on('user-join', id => {
            if (socket.myTopic === id) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(id, function () {
                console.log('user-join', id)
            })
            socket.myTopic = id
        })

        socket.on('adopt-request', data => {
            console.log('im in socket on in backend', data.owner._id, data.newRequest.userId)
            emitToUser({ type: 'adopt-request-owner', data: data.msgToOwner, userId: data.owner._id })
            emitToUser({ type: 'adopt-request-requester', data: data.msgToRequester, userId: data.newRequest.userId })
        })
        socket.on('update-new-owner', newOwner => {
            console.log('socket recived - newOwner: ', newOwner)
            emitToUser({ type: 'sending-new-owner-to-save', data: newOwner, userId: newOwner._id })
        })

        socket.on('aprove-adopt', data => {
            console.log('data-from-details', data)
        })
    })
}

function emitToAll({ type, data, room = null }) {
    if (room) gIo.to(room).emit(type, data)
    else gIo.emit(type, data)
}
//here is the problem
// TODO: Need to test emitToUser feature
function emitToUser({ type, data, userId }) {
    console.log(data, userId)
    gIo.to(userId).emit(type, data)
}


// Send to all sockets BUT not the current socket 
function broadcast({ type, data, room = null }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map')
    if (room) excludedSocket.broadcast.to(room).emit(type, data)
    else excludedSocket.broadcast.emit(type, data)
}


module.exports = {
    connectSockets,
    emitToAll,
    broadcast,
}



