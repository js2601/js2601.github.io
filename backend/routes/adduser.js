const express = require('express')
const fs = require('fs')
const router = express.Router();

function createUser(newUser, path, fileData) {
        
    fileData.push({username: newUser, balance: 1000});
    let json = JSON.stringify(fileData);
    fs.writeFile(path, json, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(`User ${newUser} added successfully`);
    })
}

router.get('/adduser/:username', (req, res) => {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json');

    fs.readFile(aPath, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
            res.send({ success: false, error: err })
            return;
        }
        const newUser = req.params.username;
        let fileData = JSON.parse(data);
        
        if (fileData.some(userData => userData.username === newUser)) {
            res.send({ success: false, error: "user already exists"});
            return;
        }

        createUser(newUser, aPath, fileData);

        res.status(200).send({ success: true, message: `added user ${newUser}` });

    });
})

module.exports = router;