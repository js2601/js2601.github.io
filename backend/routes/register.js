const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;

    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json');

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error(err);
            res.send({success: false, error: err})
            return;
        }

        fs.readFile(aPath, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                res.send({success: false, error: err})
                return;
            }

            let fileData = JSON.parse(data);
            let foundArray = fileData.find(({ username: storedUser }) => {
                return storedUser === username;
            });

            if (foundArray === undefined) {
                fileData.push({username: username, balance: 1000, password: hash});
                let json = JSON.stringify(fileData);

                fs.writeFile(aPath, json, (err) => {
                    if (err) {
                        console.error(error);
                        res.send({success: false, error: err});
                        return;
                    }
                })

                res.send({success: true, message: `User ${username} successfully registered`});
            } else {
                res.send({success: false, error: `User ${username} already exists`});
            }
        })
    });
})

module.exports = router;