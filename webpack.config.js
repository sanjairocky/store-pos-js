const path = require("path");

module.exports = {
  entry: "./lib/index.js",
  mode: "none",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "store-pos.js",
  },
};
