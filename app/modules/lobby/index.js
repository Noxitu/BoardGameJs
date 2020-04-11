const core = require('../core')

core.addStatic(__dirname)


core.io.on('connection', function(socket){    
    const username = socket.request.session.user_username

    socket.on('join', function(msg)
    {
        if (msg.room != 'lobby')
            return

        socket.join(`lobby`)
    })
})