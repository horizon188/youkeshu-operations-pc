const path = require('path');
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

function getCssModuleLoaders(isOpenCssModule) {
  let lessPath = path.resolve('theme.less')
  let lessOption = isOpenCssModule ? {
    javascriptEnabled: true,
  } : {
      javascriptEnabled: true,
      modifyVars: {
        'hack': `true; @import "${lessPath}";`,
      },
    }
  let loaders = [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, less-loader,针对css里面的@import资源
        modules: isOpenCssModule ? {// 开启css module
          localIdentName: '[name]_[local]-[hash:base64:8]',
        } : false,
      },
    },
    'postcss-loader',
    {
      loader: 'less-loader',
      options: lessOption,
    },
  ]

  loaders.unshift('style-loader')
  
  return loaders
}


module.exports = {
    mode:'development',
  entry: './app.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 定义输出目录
    filename: 'my-first-webpack.bundle.js'  // 定义输出文件名称
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 匹配.js文件
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
      }, {
          loader: "css-loader"
      }, {
          loader: "less-loader",
      }]
        // include: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMR允许在运行时更新各种模块，而无需进行完全刷新
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: path.resolve(__dirname, 'dist/index.html')
    })
  ],
  devServer: {
    hot: true, // 热替换
    contentBase: path.join(__dirname, 'dist'), // server文件的根目录
    compress: true, // 开启gzip
    port: 8080, // 端口
  },
};
 