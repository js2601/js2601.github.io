const express = require('express')
const tools = require('./tools')
const router = express.Router();

router.get('/:username', (req, res) => {
    res.status(200).send(tools.getBalance(req.params.username))
})

module.exports = router;