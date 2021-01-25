const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 因为开发的是web应用
  target: "web",
  // 定义app的入口，为一个js文件
  entry: path.join(__dirname, '../client/index.js'),
  // 定义webpack打包后的出口，包括打包文件名和存储路径
  output: {
    // 开发环境dev server不能使用chunk hash，正式环境要使用chunk hash
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  // webpack原生只支持js和json文件类型，且只支持ES5语法，我们使用.vue文件结尾的文件时，需要为其指定loader
  module: {
    rules: [
      {
        test: /\.vue$/,            // 匹配左右以.vue作为文件结尾的文件
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      // 应用于独立的jsx文件和vue文件中的`<script>`标签下的内容
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // 对于js文件分开配置，因为js要忽略掉node_modules中的内容，因为这些js文件在发布的时候已经经过编译了，不需要再处理
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: [
          // 帮助将图片转换为base64代码直接写到js中，而不用生成一个新的文件，对于小图片十分实用
          {
            loader: 'url-loader',    //将小于1024d的图片转为base64，减少http请求
            options: {
              limit: 1024 * 10,
              // 在webpack编译过程中，文件会生成几个变量（path、name、hash、ext），通过中括号包裹在字符串中来引用它
              name: '[name]-[hash:8].[ext]',
              outputPath: 'assets/img/'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
