const { Router} = require("express");
const LogEntry = require("../models/logEntry");

const router = Router();

router.get("/", async (req, res) => {
    try {
        const logs = await LogEntry.find();
        res.json(logs);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
    const logEntry = new LogEntry(req.body);
    const data = await logEntry.save();
    res.json(data);
    } catch (error) {
        if(error.name === "ValidationError") res.status(422);
        next(error);
    }
})

module.exports = router