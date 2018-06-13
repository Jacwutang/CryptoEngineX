const express = require("express");
const router = express.Router();

const usersController = require("./usersController");

//GET requests
router.get("/", usersController.index);
router.get("/:id", usersController.user_detail);

//POST requests
router.post("/", usersController.create_user);

module.exports = router;
