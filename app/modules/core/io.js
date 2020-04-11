const server = require('./server')
const session = require('./session')

const io = require('socket.io')(server)

io.use(function(socket, next) {
    session(socket.request, socket.request.res, next);
})

module.exports = io
