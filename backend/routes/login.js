const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// const dotenv = require('dotenv');
// dotenv.config();

router.post('/login', (req, res) => {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json');
    const { username, password } = req.body;
    fs.readFile(aPath, 'utf-8', (err, data) => {
        if (err) {
            console.error(error);
            res.send({success: false, error: err});
            return
        }
        
        let fileData = JSON.parse(data);
        let foundArray = fileData.find(({ username: storedUser }) => {
            return storedUser == username;
        });

        if (foundArray === undefined) {
            res.status(400).send({success: false, error: "Authentication failed"});
            return;
        } else {
            bcrypt.compare(password, foundArray.password, (err, result) => {
                if (err) {
                    console.error(error);
                    res.status(400).send({success: false, error: err});
                    return
                }

                if (result) {
                    // const token = jwt.sign({username: username}, process.env.secret, {expiresIn: '1h'});
                    const token = jwt.sign({username: username}, 'test', {expiresIn: '1h'});
                    res.json({ token });
                } else {
                    res.status(400).send({success: false});
                }
            })
        }
    }) 
})

module.exports = router;