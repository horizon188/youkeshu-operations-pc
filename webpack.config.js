const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

new HappyPack({
  id: "jsx",
  threads: 4,
  // cache: true,
  loaders: [
    {
      loader: "babel-loader",
      query: {
        presets: [
          [
            "latest",
            {
              loose: true,
              modules: false,
            },
          ],
          "react",
          "es2015",
          "stage-0",
        ],
        plugins: [
          "transform-decorators-legacy",
          "transform-class-properties",
          "transform-object-rest-spread",
          ["import", { libraryName: "antd", style: false }],
          ["babel-plugin-imports-transform"],
        ],
        cacheDirectory: true,
      },
    },
  ],
}),
  (module.exports = {
    mode: "development",
    entry: "./app.js", // 入口文件
    output: {
      path: path.resolve(__dirname, "dist"), // 定义输出目录
      filename: "my-first-webpack.bundle.js", // 定义输出文件名称
    },
    module: {
      rules: [
            // "babel-plugin-transform-object-rest-spread": "^6.26.0",
        // {
        //   test: /\.(js|jsx)$/, // 匹配.js文件
        //   use: "happypack/loader?id=jsx",
        //   include: path.join(__dirname, "src"),
        //   exclude: /(node_modules)/,
        // },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(css|less)$/,
          use: [
            {
              loader: "style-loader",
            },
            {
              loader: "css-loader",
            },
            {
              loader: "less-loader",
            },
          ],
          // include: path.resolve(__dirname, 'node_modules'),
        },
      ],
    },
    devtool: "cheap-module-source-map",
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // HMR允许在运行时更新各种模块，而无需进行完全刷新
      new HtmlWebPackPlugin({
        template: "./index.html",
        filename: path.resolve(__dirname, "dist/index.html"),
      }),
      new CopyWebpackPlugin(
        { patterns: [{ from: "./dll", to: "dll" }] } // 需要拷贝的目录或者路径通配符
      ),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("./dll/manifest.json"),
      }),
    ],
    resolve: {
      alias: {
        component: path.join(__dirname, "src/component"),
      },
      modules: [path.join(__dirname, "src"), "node_modules"],
      extensions: [".js", ".jsx", ".less", ".css"],
    },
    devServer: {
      hot: true, // 热替换
      contentBase: path.join(__dirname, "dist"), // server文件的根目录
      compress: true, // 开启gzip
      port: 8080, // 端口
    },
  });
