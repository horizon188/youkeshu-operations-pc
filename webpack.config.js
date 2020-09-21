const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HappyPack = require("happypack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css压缩
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
// var CompressionWebpackPlugin = require("compression-webpack-plugin");

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
      chunkFilename: "[name].[chunkhash:8].js",
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
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(css|less)$/,
          use: [
            MiniCssExtractPlugin.loader,
            // {
            //   loader: "style-loader",
            // },
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                },
              },
            },
            "postcss-loader",
            {
              loader: "less-loader",
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|md)$/,
          use: ["url-loader?limit=10000&name=[md5:hash:base64:10].[ext]"],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: ["url-loader?limit=10000&mimetype=images/svg+xml"],
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff",
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader",
        },
      ],
    },
    // devtool: "cheap-module-source-map",
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // HMR允许在运行时更新各种模块，而无需进行完全刷新
      new HtmlWebPackPlugin({
        template: "./index.html",
        filename: path.resolve(__dirname, "dist/index.html"),
        minify: {
          removeComments: true, //去注释
          collapseWhitespace: true, //压缩空格
          removeAttributeQuotes: true, //去除属性引用
        },
      }),
      new CopyWebpackPlugin(
        { patterns: [{ from: "./dll", to: "dll" }] } // 需要拷贝的目录或者路径通配符
      ),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require("./dll/manifest.json"),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:16].css",
        chunkFilename: "[name].[contenthash:16].css",
      }),
      new OptimizeCssAssetsPlugin(),
    ],
    // optimization: {
    //   minimizer: [
    //     // 压缩插件
    //     new ParallelUglifyPlugin({
    //       cacheDir: ".cache/",
    //       uglifyJS: {
    //         output: {
    //           comments: false, //去掉注释
    //         },
    //         warnings: false,
    //         compress: {},
    //       },
    //     }),
    //   ],
    // },
    resolve: {
      alias: {
        component: path.join(__dirname, "src/component"),
        assets: path.join(__dirname, "src/assets"),
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
