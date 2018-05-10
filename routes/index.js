const router = require('express').Router();

// GET home page
router.get('/', (req,res) => {
  res.send("Home");
});

module.exports = router;
