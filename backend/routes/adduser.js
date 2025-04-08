const express = require('express')
const fs = require('fs')
const tools = require('./tools.js')
const router = express.Router();

router.get('/adduser/:username', (req, res) => {
    const fileData = tools.readData();

    const newUser = req.params.username;
    
    fileData.push({username: newUser, balance: 1000});
    let json = JSON.stringify(fileData);
    fs.writeFile(aPath, json, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(`User ${newUser} added successfully`);
    })

    res.send(200).json({ status: "success" });
})

module.exports = router;