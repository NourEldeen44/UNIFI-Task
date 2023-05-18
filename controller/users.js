const { StatusCodes } = require("http-status-codes");
const {
  ApiError,
  NotFound,
  UnAuthorizedError,
  BadRequest,
} = require("../errors");
const User = require("../model/user");

const getAllUsers = async (req, res) => {
  try {
    const authedUser = req.user;
    // console.log(authedUser);
    //if Admin get all users
    if (authedUser.role === "admin") {
      const users = await User.find();
      res.status(StatusCodes.OK).json({ users, usersCount: users.length });
    } else {
      // else get only his own user info
      const user = await User.findById(authedUser.id);
      res.status(StatusCodes.OK).json({ user });
    }
  } catch (error) {
    throw new ApiError(error.message);
  }
};
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const authedUser = req.user;
    // console.log(authedUser);
    // IF Admin get user from user:id param
    if (authedUser.role === "admin") {
      const user = await User.findById(id);
      if (!user) {
        throw new NotFound(`No User Found with id ${id}`);
      }
      res.status(StatusCodes.OK).json({ user });
    } else {
      //else get his own user info
      const user = await User.findById(authedUser.id);
      if (!user) {
        throw new NotFound(`No User Found with id ${id}`);
      }
      res.status(StatusCodes.OK).json({ user });
    }
  } catch (error) {
    throw new ApiError(error.message);
  }
};
const createNewUser = async (req, res) => {
  const authedUser = req.user;
  //if admin
  if (authedUser.role === "admin") {
    const { name, email, password, role } = req.body;
    //check bad request
    if (!name || !email || !password || !role) {
      throw new BadRequest(
        "please provide all followed values //name, email, password, role//"
      );
    }
    try {
      const userData = { name, email, password, role };
      // console.log(userData);
      const user = await User.create(userData);
      res.status(StatusCodes.CREATED).json({
        msg: `user created succesfully`,
        success: true,
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
          role: user.role,
        },
      });
    } catch (error) {
      throw new ApiError(error);
    }
  } else {
    throw new UnAuthorizedError("Only Admins Authorized to perform this task");
  }
};
const updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const authedUser = req.user;
  const { id } = req.params;
  let QueryObj = {};
  if (name) {
    QueryObj.name = name;
  }
  if (email) {
    QueryObj.email = email;
  }
  if (password) {
    QueryObj.password = password;
  }
  if (role) {
    QueryObj.password = password;
  }
  // if no data Provided
  if (!Object.keys(QueryObj).length) {
    throw new BadRequest("please Provide any user data to modify");
  }
  // if Admin
  if (authedUser.role === "admin") {
    const user = await User.findByIdAndUpdate(id, QueryObj, { new: true });
    if (!user) {
      throw new NotFound(`No User Found With id ${id}`);
    }
    res.status(StatusCodes.OK).json({ msg: "success", user });
  } else {
    const user = await User.findByIdAndUpdate(authedUser.id, QueryObj, {
      new: true,
    });
    if (!user) {
      throw new NotFound(`No User Found With id ${authedUser.id}`);
    }
    res.status(StatusCodes.OK).json({ msg: "success", user });
  }
};
const deleteSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const authedUser = req.user;
    if (authedUser.role === "admin") {
      // if Admin
      const user = await User.findByIdAndRemove(id);
      if (!user) {
        throw new NotFound(`No User Found with id ${id}`);
      }
      res.status(StatusCodes.OK).json({ msg: "success" });
    } else {
      //if not admin
      const user = await User.findByIdAndRemove(authedUser.id);
      if (!user) {
        throw new NotFound(`No User Found with id ${id}`);
      }
      res.status(StatusCodes.OK).json({ msg: "sucess" });
    }
  } catch (error) {
    throw new ApiError(error);
  }
};
module.exports = {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteSingleUser,
};
