const express = require('express');
const serverless = require('serverless-http')
const app = express();

const usersRoute = require('./routes/user')

app.use('/users', usersRoute)

exports.handler = serverless(app)