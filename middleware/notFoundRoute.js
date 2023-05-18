const notFoundRoute = (req, res) => {
  res.status(404).send("<h1>This is a 404 :(</h1>");
};
module.exports = notFoundRoute;
