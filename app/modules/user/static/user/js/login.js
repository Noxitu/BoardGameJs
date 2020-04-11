window.addEventListener('load', function()
{
    const login_history = jsonStorage.getItem('user-login_history', [])

    if (login_history.length == 0)
        return

    const html = ['<h1>Previous Logins</h1>']

    login_history.forEach( username => 
    {
        const picture = jsonStorage.getItem(`user-picture:${username}`, 'undefined')

        html.push(`<form method="POST" action="/app/user/login">`)
        html.push(`  <input type="hidden" name="username" value="${username}">`)
        html.push(`  <button>`)
        html.push(`    <img src="https://graph.facebook.com/${picture}/picture?type=square&height=40&width=40">`)
        html.push(`    <span>${username}</span>`)
        html.push(`  </button>`)
        html.push(`</form>`)
    })

    document.querySelector('#previous').innerHTML = html.join('')
})