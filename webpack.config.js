const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: "./main.js",
    geometry: "./geometry.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
    hot: true,
  },
};
