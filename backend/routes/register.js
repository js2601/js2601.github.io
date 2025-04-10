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
        }

        fs.readFile(aPath)
        
    });
})