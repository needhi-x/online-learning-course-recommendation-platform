const express = require("express");
const router = express.Router();
const rec = require("../controllers/recommendController");

router.post("/", rec.recommend);

module.exports = router;