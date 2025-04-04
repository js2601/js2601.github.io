const express = require('express');
const serverless = require('serverless-http')
const app = express();

const usersRoute = require('./routes/user.js')
const setbalRoute = require('./routes/setbal.js')
const addUserRoute = require('./routes/adduser.js')

app.use('/users', usersRoute)
app.use('/users', setbalRoute)
app.use('/users', addUserRoute)


exports.handler = serverless(app)