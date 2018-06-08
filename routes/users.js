const router = require("express-promise-router").Router();

const db = require("../db");

//Load in controllers
const user_controller = require("../controllers/userController");

router.get("/", user_controller.user_list);

module.exports = router;
