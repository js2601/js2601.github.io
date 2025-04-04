const express = require('express');
const serverless = require('serverless-http')
const app = express();

const usersRoute = require('./routes/user')
const setbalRoute = require('./routes/setbal')
const addUserRoute = require('./routes/adduser')

app.use('/users', usersRoute)
app.use('/users', setbalRoute)
app.use('/users', addUserRoute)


exports.handler = serverless(app)