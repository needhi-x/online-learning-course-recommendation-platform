const express = require("express");
const router = express.Router();
const enroll = require("../controllers/enrollController");

router.post("/", enroll.enroll);
router.post("/progress", enroll.updateProgress);

module.exports = router;