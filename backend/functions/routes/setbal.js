const express = require('express')
const fs = require('fs')
const router = express.Router();

router.get('/:username/updatebal/:bal', (req, res) => {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json')
    const fileData = JSON.parse(fs.readFileSync(aPath, 'utf8'));

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

        console.log(`Balance updated for ${filedata[index].username} to ${bal}`);
    })

    res.send(200).send({ status: "success" });
})

module.exports = router;