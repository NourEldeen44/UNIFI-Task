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
// Routes
app.use(router);
// Not Found
app.use(notFoundRoute);
// Error Handler
app.use(errHandler);
startServer(port, DBUri);
