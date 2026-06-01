const Enrollment = require("../models/Enrollment");

exports.enroll = async (req, res) => {
  const data = await Enrollment.create({
    userId: req.body.userId,
    courseId: req.body.courseId
  });

  res.json(data);
};

exports.updateProgress = async (req, res) => {
  const e = await Enrollment.findById(req.body.enrollId);
  e.progress = req.body.progress;
  await e.save();

  res.json(e);
};