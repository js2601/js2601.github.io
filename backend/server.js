const express = require('express');
const app = express();
const port = 3000;

const usersRoute = require('./routes/user')

app.use('/users', usersRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});