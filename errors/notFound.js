const { StatusCodes } = require("http-status-codes");
const ApiError = require("./apiErrors");

class NotFound extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
module.exports = NotFound;
