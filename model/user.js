const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema, Types, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minLength: [3, "too short name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required !"],
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required !"],
      minLength: [6, "too short password"],
    },
    role: {
      type: String,
      required: [true, "role is required !"],
      enum: ["admin", "user"],
    },
  },
  { timestamps: { updatedAt: "changedAt", createdAt: true } }
);
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.createJWT = async function () {
  const userData = {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
  };
  const token = await jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
const User = model("User", userSchema, "user-test-NourEldeen");
module.exports = User;
