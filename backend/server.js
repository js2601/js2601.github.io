const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const allowedIPs = ['185.199.108.153', '185.199.109.153', '185.199.110.153', 
  '185.199.111.153'];

const usersRoute = require('./routes/user.js')
const setbalRoute = require('./routes/setbal.js')
const addUserRoute = require('./routes/adduser.js')

app.use((req, res, next) => {
  const ip = req.ip;

  if (allowedIPs.includes(ip)) {
    next();
  } else {
    res.status(403).send('Forbidden')
  }
})

app.use('/', usersRoute)
app.use('/', setbalRoute)
app.use('/', addUserRoute)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
