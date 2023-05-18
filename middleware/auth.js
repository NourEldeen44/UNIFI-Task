const jwt = require("jsonwebtoken");
const { UnAuthorizedError } = require("../errors");
const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
      next();
    } catch (error) {
      throw new UnAuthorizedError("Err Unverfied Or Expired Token !");
    }
  } else {
    throw new UnAuthorizedError("token required");
  }
};
module.exports = auth;
