const router = require("express-promise-router").Router();

const db = require("../db");

// GET home page
router.get("/", (req, res) => {
  res.send("Home");
});

module.exports = router;
