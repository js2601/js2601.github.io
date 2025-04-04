const express = require('express')
const fs = require('fs')
const router = express.Router();

router.get('/adduser/:username', (req, res) => {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json')
    const fileData = JSON.parse(fs.readFileSync(aPath, 'utf8'));

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

    res.send(200).send({ status: "success" });
})

module.exports = router;