const User = require("../models/User");
const Course = require("../models/Course");

exports.recommend = async (req, res) => {
  const user = await User.findById(req.body.userId);
  const courses = await Course.find();

  const recommended = courses.filter(course =>
    course.tags.some(tag => user.interests.includes(tag))
  );

  res.json(recommended);
};