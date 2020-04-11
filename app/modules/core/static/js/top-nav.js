
function createProfileContextMenu()
{
    const nav = document.createElement('nav')
    nav.id = 'profile-context-menu'
    nav.classList.add('hidden')
    nav.innerHTML = [
        `<a href="/user/change_picture">Change Profile Picture</a>`,
        `<a href="/app/user/logout">Logout</a>`
    ].join('\n')

    document.body.append(nav)
}

function createNav()
{
    const nav = document.createElement('nav')
    nav.id = 'top-nav'
    nav.innerHTML = [
        `<a href="/">Lobby</a>`,
        `<div></div>`,
        // `<a data-authorized="yes">Notifications</a>`,
        `<a href=/app/user/login data-authorized="no">Login</a>`,
        `<a class="login-status" data-authorized="yes"><span class="profile-username">Username</span> <img class="profile-pic"></a>`
    ].join('\n')

    nav.querySelector('.login-status').addEventListener('click', function()
    {
        document.querySelector('#profile-context-menu').classList.toggle('hidden')
    })

    document.body.prepend(nav)
}

window.addEventListener('load', function()
{
    createNav()
    createProfileContextMenu()

    const menuElement = document.querySelector('#profile-context-menu')

    document.addEventListener('click', function(ev)
    {
        if (menuElement.classList.contains('hidden'))
            return

        if (ev.target.matches('.login-status, .login-status *, #profile-context-menu, #profile-context-menu *'))
            return

            document.querySelector('#profile-context-menu').classList.add('hidden')
    })
})