const express = require("express");
const router = express.Router();

const usersController = require("./usersController.js");

//GET requests
router.get("/", usersController.index);
router.get("/:id", usersController.get_user);

//POST requests
router.post("/", usersController.create_user);

module.exports = router;
