const express = require('express');
const router = express.Router();

router.get('/:username', (req, res) => {
    res.send(getBalance(req.params.username))
})

module.exports = router;