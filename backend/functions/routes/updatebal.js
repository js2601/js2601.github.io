const express = require('express')
const tools = require('./tools')
const router = express.Router();

router.get('/:username/updatebal/:bal', (req, res) => {
    res.status(200).send(tools.setBalance(user, bal))
})

module.exports = router;