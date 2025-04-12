const express = require('express')
const fs = require('fs')
const router = express.Router();
const jwtAuth = require('./authorize.js');

router.get('/setbal/:bal', jwtAuth, (req, res) => {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json')

    fs.readFile(aPath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            res.send({ success: false, error: err})
            return;
        }
        const user = req.user.username;
        const bal = req.params.bal;
        let fileData = JSON.parse(data);

        let index = fileData.findIndex(({ username }) => {
            return username === user;
        })

        if (index === -1) {
            res.send({success: false, error: "user does not exist"});
            return;
        }

        fileData[index].balance = bal;
        const json = JSON.stringify(fileData);

        fs.writeFile(aPath, json, (err) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(`Balance updated for ${fileData[index].username} to ${bal}`);
        })

        res.status(200).send({ success: true, message: `set balance of ${user} to ${bal}` });

    });
})

module.exports = router;