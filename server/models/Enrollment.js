const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  progress: { type: Number, default: 0 }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);