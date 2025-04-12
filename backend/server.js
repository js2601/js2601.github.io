const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const allowedIPs = ['185.199.108.153', '185.199.109.153', '185.199.110.153', 
  '185.199.111.153'];

const usersRoute = require('./routes/user.js')
const setbalRoute = require('./routes/setbal.js')
const loginRoute = require('./routes/login.js')
const registerRoute = require('./routes/register.js')

// app.use((req, res, next) => {
//   const ip = req.ip;

//   if (allowedIPs.includes(ip)) {
//     next();
//   } else {
//     res.status(403).send('Forbidden')
//   }
// })

app.use(express.json());
app.use('/', usersRoute)
app.use('/', setbalRoute)
app.use('/', loginRoute)
app.use('/', registerRoute)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
