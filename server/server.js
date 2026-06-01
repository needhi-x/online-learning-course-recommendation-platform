require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/recommend", require("./routes/recommendRoutes"));
app.use("/api/enroll", require("./routes/enrollRoutes"));

app.get("/", (req, res) => {
  res.send("EdTech API Running");
});

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);