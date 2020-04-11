const express = require('express')
const logger = require('morgan');
const session = require('./session')

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));;
app.use(session);

module.exports = app
