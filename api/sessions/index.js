const express = require("express");
const router = express.Router();

const sessionsController = require("./sessionsController");

router.post("/", sessionsController.create_session);

router.delete("/", sessionsController.destroy_session);

module.exports = router;
