if (process.env.NODE_ENV === "development") {
  module.exports = require("./dev");
} else {
  //production environment
}
