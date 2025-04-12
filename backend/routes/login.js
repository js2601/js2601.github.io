const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    fs.readFile(aPath, 'utf-8', (err, data) => {
        if (err) {
            console.error(error);
            res.send({success: false, error: err});
        }

        let foundArray = fileData.find(({ username }) => {
            return username === user;
        });

        if (foundArray === undefined) {
            res.send({success: false, error: "Authentication failed"});
            return;
        } else {
            bcrypt.compare(password, foundArray.password, (err, result) => {
                handleError(err, res);

                if (result) {
                    const token = jwt.sign({username: username}, process.env.secret, {expiresIn: '1h'});
                    res.json({ token });
                } else {
                    res.send({success: false});
                }
            })
        }
    }) 
})

module.exports = router;