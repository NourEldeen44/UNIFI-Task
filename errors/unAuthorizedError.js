const ApiError = require("./apiErrors");
const { StatusCodes } = require("http-status-codes");
class UnAuthorizedError extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
module.exports = UnAuthorizedError;
