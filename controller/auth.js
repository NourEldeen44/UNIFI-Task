const {
  BadRequest,
  NotFound,
  ApiError,
  UnAuthorizedError,
} = require("../errors");
const User = require("../model/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  //check bad request
  if (!name || !email || !password || !role) {
    throw new BadRequest(
      "please provide all values as followed {name, email, password, role}"
    );
  }
  try {
    const userData = { name, email, password, role };
    // console.log(userData);
    const user = await User.create(userData);
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({
      msg: `user created succesfully`,
      success: true,
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    throw new ApiError(error);
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  //check bad request
  if (!email || !password) {
    throw new BadRequest("please provide email and password");
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnAuthorizedError("unvalid Credentials");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthorizedError("unvalid Credentials");
    }
    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    throw new ApiError(error);
  }
};
module.exports = { register, login };
