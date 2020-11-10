const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    vendor: [
      "react",
      "react-dom",
      "react-router",
      "react-router-dom",
      "lodash",
    ],
  },
  output: {
    path: path.join(__dirname, "dll"),
    filename: "[name].js",
    library: "[name]",
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "dll", "manifest.json"),
      // filename: '[name].js',
      name: "[name]",
    }),
  ],
};
