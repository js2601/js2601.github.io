const express = require('express');
const app = express();
const port = 3000;

const usersRoute = require('./routes/user.js')
const setbalRoute = require('./routes/setbal.js')
const addUserRoute = require('./routes/adduser.js')

app.use('/', usersRoute)
app.use('/', setbalRoute)
app.use('/', addUserRoute)

app.listen(3000, () => {
    console.log(`App listening on port ${port}`)
  })
