const express = require("express");
const router = express.Router();

const sessionsController = require("./sessionsController");

router.post("/new", sessionsController.create_session);

router.delete("/destroy", sessionsController.destroy_session);

module.exports = router;
