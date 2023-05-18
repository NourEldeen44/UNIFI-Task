require("dotenv").config();
require("express-async-errors");
const errHandler = require("./middleware/errorhandler");
const express = require("express");
const connect = require("./DB/connect");
const notFoundRoute = require("./middleware/notFoundRoute");
const router = require("./routes");
const app = express();
const port = process.env.PORT;
const DBUri = process.env.DB_URI;
const startServer = async (port, uri) => {
  try {
    await connect(uri);
    app.listen(port, () => {
      console.log(`connected to DB and server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
app.use(express.json());
// app.post("/", async (req, res, next) => {
//   const { userData } = req.body;
//   const token = jwt.sign(userData, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
//   try {
//     const user = await User.create(userData);
//     res.status(StatusCodes.CREATED).json({ user, token });
//   } catch (error) {
//     throw new ApiError(error);
//   }
// });
// app.get("/", auth, async (req, res, next) => {
//   try {
//     const { name, age } = (user = req.user);
//     const users = await User.find();
//     res.status(200).json({ users, userData: user });
//   } catch (error) {
//     throw new ApiError(error.message);
//   }
// });
// app.get("/error", (req, res, next) => {
//   throw new unAuthorizedError("un Authed MSG");
// });
// Routes
app.use(router);
// Not Found
app.use(notFoundRoute);
// Error Handler
app.use(errHandler);
startServer(port, DBUri);
