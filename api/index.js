const express = require("express");
const router = express.Router();

const userRoutes = require("./users");
const sessionRoutes = require("./sessions");

router.use("/users", userRoutes);
router.use("/session", sessionRoutes);

//export all routes
module.exports = router;
