const express = require('express')
const fs = require('fs')
const router = express.Router();

router.get('/updatebal/:username/:bal', (req, res) => {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json')

    fs.readFile(aPath, 'utf-8', (err, fileData) => {
        if (err) {
            console.error(err);
            return;
        }
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

    });
})

module.exports = router;