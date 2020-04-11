const cookieSession = require('cookie-session')
module.exports = cookieSession({keys: ['secret key']})