const express = require("express");
const router = express.Router();

router.get("/api/working", function(req, res, next) {
    res.send("API is working properly Kps School");
});

module.exports = router;