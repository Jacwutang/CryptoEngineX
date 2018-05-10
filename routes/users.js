const router = require('express').Router();

//Load in controllers
const user_controller = require('../controllers/userController');


router.get('/', user_controller.user_list);

module.exports = router;
