window.addEventListener('load', function()
{
    socket.emit('join', {room: 'user'})
})

function updateLoginHistory(username)
{
    var login_history = jsonStorage.getItem('user-login_history', [])

    if (login_history.length > 0 && login_history[0] == username)
        return

    var updated_history = [username].concat(login_history.filter(e => e != username)).slice(0, 3)

    jsonStorage.setItem('user-login_history', updated_history)
}

function updatePicture(msg)
{
    const known_picture = jsonStorage.getItem(`user-picture:${msg.username}`)
    const known_picture_date = jsonStorage.getItem(`user-picture_date:${msg.username}`)

    if (known_picture_date > msg.picture_date)
    {
        socket.emit('user:update-picture', {
            picture: known_picture,
            picture_date: known_picture_date
        })

        return known_picture
    }

    if (known_picture_date < msg.picture_date)
    {
        jsonStorage.setItem(`user-picture:${msg.username}`, msg.picture)
        jsonStorage.setItem(`user-picture_date:${msg.username}`, msg.picture_date)
    }

    return msg.picture
}

socket.on('user:hello', function(msg)
{
    if (msg.username === undefined)
    {
        document.body.dataset['isAuthorized'] = 'no'
        return
    }

    document.body.dataset['isAuthorized'] = 'yes'

    updateLoginHistory(msg.username)
    
    const picture = updatePicture(msg)

    document.querySelector('#top-nav .profile-username').innerHTML = msg.username
    document.querySelector('#top-nav .profile-pic').src = `http://graph.facebook.com/${picture}/picture?type=square&height=40&width=40`
})