const express = require('express')
const fs = require('fs')
const router = express.Router();

router.get('/:username', (req, res) => {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json')
    fs.readFile(aPath, 'utf-8', (err, fileData) => {
        if (err) {
            console.error(err);
            res.send({ status: "failure", error: err})
            return;
        }

        const user = req.params.username;

        let foundArray = fileData.find(({ username }) => {
            return username === user;
        })

        res.status(200).send(foundArray);

    });
})

module.exports = router;