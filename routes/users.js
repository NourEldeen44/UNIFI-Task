const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  deleteSingleUser,
  updateUser,
} = require("../controller/users");
const UsersRouter = express.Router();
UsersRouter.get("/", getAllUsers);
UsersRouter.get("/:id", getSingleUser);
UsersRouter.post("/", createNewUser);
UsersRouter.put("/:id", updateUser);
UsersRouter.delete("/:id", deleteSingleUser);
module.exports = UsersRouter;
