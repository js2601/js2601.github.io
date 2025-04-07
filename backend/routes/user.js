const express = require('express')
const fs = require('fs')
const router = express.Router();

router.get('/:username', (req, res) => {
    const path = require("path");
    const aPath = path.resolve(__dirname, '../data.json')
    const fileData = JSON.parse(fs.readFileSync(aPath, 'utf8'));

    const user = req.params.username;

    let foundArray = fileData.find(({ username }) => {
        return username === user;
    })

    res.status(200).send(foundArray);
})

module.exports = router;