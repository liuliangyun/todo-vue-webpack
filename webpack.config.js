const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // 定义app的入口，为一个js文件
  entry: path.join(__dirname, 'src/index.js'),
  // 定义webpack打包后的出口，包括打包文件名和存储路径
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  // webpack原生只支持js和json文件类型，且只支持ES5语法，我们使用.vue文件结尾的文件时，需要为其指定loader
  module: {
    rules: [
      {
        test: /\.vue$/,            // 匹配左右以.vue作为文件结尾的文件
        loader: 'vue-loader'
      },
      // 应用于独立的js文件和vue文件中的`<script>`标签下的内容
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // 应用于独立的css文件和vue文件中的`<style>`标签下的内容
      {
        test: /\.css$/,
        // use 中的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
        use: [
          'vue-style-loader',      // 帮助将css样式写到html中
          'css-loader'        // 帮助从css文件中加载样式，至于最终是插入到html中还是写到新的文件中由其他loader决定
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader'      // 帮助加载stylus文件，转成css代码
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: [
          // 帮助将图片转换为base64代码直接写到js中，而不用生成一个新的文件，对于小图片十分实用
          {
            loader: 'url-loader',    //将小于1024d的图片转为base64，减少http请求
            options: {
              limit: 1024 * 10,
              name: '[name]-test.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 使用vue-loader别忘了一定要引入VueLoaderPlugin
    new VueLoaderPlugin()
  ]
}