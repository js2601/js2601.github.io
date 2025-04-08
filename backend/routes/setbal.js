const express = require('express')
const fs = require('fs')
const tools = require('./tools.js')
const router = express.Router();

router.get('/updatebal/:username/:bal', (req, res) => {
    const fileData = tools.readData();

    const user = req.params.username;
    const bal = req.params.bal;

    let index = fileData.findIndex(({ username }) => {
        return username === user;
    })

    fileData[index].balance = bal;
    const json = JSON.stringify(fileData);

    fs.writeFile(aPath, json, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(`Balance updated for ${fileData[index].username} to ${bal}`);
    })

    res.send(200).send({ status: "success" });
})

module.exports = router;