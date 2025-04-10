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
    const aPath = path.resolve(__dirname, '../data.json')

    fs.readFile(aPath, 'utf-8', (err, fileData) => {
        if (err) {
            console.log(err)
            res.send({ status: "failure", error: err})
            return;
        }

        const newUser = req.params.username

        createUser(newUser, aPath, fileData)

        res.send(200).send({ status: "success", message: `added user ${newUser}` });

    });
})

module.exports = router;