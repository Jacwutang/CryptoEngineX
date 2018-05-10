const User = require('../models/userModel');

exports.user_list = (req,res) => {
  res.send("All Users");
};
