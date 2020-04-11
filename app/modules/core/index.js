const app = require('./app')
const debug = require('debug')('app:core')
const express = require('express')
const path = require('path')

app.set('view engine', 'pug')
app.set("views", [])

const core = {
    app: app,
    io: require('./io'),
    addStatic: function(dirname)
    {
        app.use(express.static(path.join(dirname, 'static'), {extensions:['html']}))
    },
    addTemplates: function(dirname)
    {
        app.set('views', app.get('views').concat(path.join(dirname, 'templates')))
    }
}

core.addStatic(__dirname)
core.addTemplates(__dirname)

module.exports = core