const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const allowedIPs = ['185.199.108.153', '185.199.109.153', '185.199.110.153', 
  '185.199.111.153'];

const usersRoute = require('./backend/routes/user.js')
const setbalRoute = require('./backend/routes/setbal.js')
const loginRoute = require('./backend/routes/login.js')
const registerRoute = require('./backend/routes/register.js')

// app.use((req, res, next) => {
//   const ip = req.ip;

//   if (allowedIPs.includes(ip)) {
//     next();
//   } else {
//     res.status(403).send('Forbidden')
//   }
// })

app.use(express.json());
app.use('/api', usersRoute)
app.use('/api', setbalRoute)
app.use('/api', loginRoute)
app.use('/api', registerRoute)

app.use(express.static(path.join(__dirname)))






app.listen(port, '::', () => {
  console.log(`Server listening on [::]${port}`);
});
