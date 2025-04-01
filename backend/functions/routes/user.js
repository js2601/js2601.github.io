import express, { Router } from "express";

const router = Router();

router.get('/:username', (req, res) => {
    res.status(200).send(tools.getBalance(req.params.username))
})

module.exports = router;