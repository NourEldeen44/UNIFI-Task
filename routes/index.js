const express = require("express");
const authRouter = require("./auth");
const UsersRouter = require("./users");
const auth = require("../middleware/auth");
const router = express.Router();
router.use("/users", authRouter);
router.use("/users", auth, UsersRouter);
module.exports = router;
