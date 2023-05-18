const { StatusCodes } = require("http-status-codes");
const ApiError = require("./apiErrors");

class BadRequest extends ApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
module.exports = BadRequest;
