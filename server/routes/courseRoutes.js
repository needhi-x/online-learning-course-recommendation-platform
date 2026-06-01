const express = require("express");
const router = express.Router();
const course = require("../controllers/courseController");

router.post("/", course.addCourse);
router.get("/", course.getCourses);

module.exports = router;