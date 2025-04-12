const express = require('express')
const fs = require('fs')
const router = express.Router();
const jwtAuth = require('./authorize.js');

router.get('/:username', (req, res) => {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json')
    fs.readFile(aPath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.send({ success: false, error: err });
            return;
        }

        const fileData = JSON.parse(data);
        const user = req.user.username;

        let foundArray = fileData.find(({ username }) => {
            return username === user;
        });

        if (foundArray === undefined) {
            res.send({ success: false, error: "user does not exist"});
            return;
        }

        res.status(200).send(foundArray);

    });
})

module.exports = router;