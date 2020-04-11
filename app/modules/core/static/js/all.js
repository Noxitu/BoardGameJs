function include(path)
{
    // console.log(`include(${path})`)
    document.write(`<script src="${path}"></script>`)
}

include('/socket.io/socket.io.js')
include('/js/jsonStorage.js')
include('/js/top-nav.js')
include('/js/socket.js')
include('/user/js/user.js')
