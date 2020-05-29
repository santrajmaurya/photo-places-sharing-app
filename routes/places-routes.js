const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("GET Request");
  res.json({ message: "It works" });
  next();
});

module.exports = router;
