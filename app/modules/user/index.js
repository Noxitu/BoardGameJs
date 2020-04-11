const core = require('../core')
const createError = require('http-errors')
const express = require('express')

const router = express.Router()

const USER_DATA = {}

function getUserData(username)
{
    var user_data = USER_DATA[username]

    if (user_data === undefined)
    {
        user_data = USER_DATA[username] = {
            picture: 'undefined',
            picture_date: 0
            //picture: 100000356235649,
            //picture_date: new Date().getTime()
        }
    }

    return user_data
}

function setUserData(username, data)
{
    USER_DATA[username] = data
}

router.get("/login", function(req, res, next) {
    if (req.session.user_username)
        return res.redirect('/')

    return res.render('user/login')
})
    
router.post("/login", function(req, res, next) {
    const username = req.body.username
    if (username === undefined || username == '')
        return next(createError(400))

    req.session.user_username = username
    
    return res.redirect('/')
})

router.get("/logout", function(req, res, next) {
    req.session.user_username = undefined
    return res.redirect('/app/user/login')
})

router.post("/update-picture", function(req, res, next) {
    const username = req.session.user_username
    
    if (username === undefined || username == '')
        return next(createError(400))


    setUserData(username, {
        picture: req.body.picture,
        picture_date: new Date().getTime()
    })
    
    return res.redirect('/user/change_picture')
})

core.addStatic(__dirname)
core.addTemplates(__dirname)

core.app.use('/app/user', router)

core.io.on('connection', function(socket){
    const username = socket.request.session.user_username

    socket.on('join', function(msg)
    {
        if (msg.room != 'user')
            return

        if (username === undefined)
        {
            socket.emit('user:hello', {})
            return
        }

        const user_data = getUserData(username)

        socket.emit('user:hello', {
            username: username,
            picture: user_data.picture,
            picture_date: user_data.picture_date
        })

        socket.join(`user:${username}`)
    })

    if (username === undefined)
        return

    socket.on('user:update-picture', function(msg)
    {
        setUserData(username, {
            picture: msg.picture,
            picture_date: msg.picture_date || new Date().getTime()
        })
    })
})

// const inspect = require('util').inspect
// res.locals.req = inspect(req)
// return res.render('req')