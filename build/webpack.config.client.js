const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将css提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 每次webpack build成功之后清除之前的 webpack's output.path 目录下的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'
console.log('isDev: ', isDev)

// devServer启动后是一个服务，设定host和port
const devServer = {
  port: 8000,
  // host可以设为localhost表示本机地址，这里设为0.0.0.0也是本机地址，但是使用这种方式其他机器可以通过ip访问你的本地服务
  host: '0.0.0.0',
  // webpack编译时有任何错误都出现在网页中
  overlay: {
    errors: true
  },
  // 开启热加载，不刷新即可更新页面的数据
  hot: true
}

// 之所以不写在baseConfig里面，是因为后面如果使用了服务端渲染，则不需要一些plugin比如HtmlWebpackPlugin
const defaultPlugin = [
  new CleanWebpackPlugin(),
  // 使用vue-loader别忘了一定要引入VueLoaderPlugin
  new VueLoaderPlugin(),
  // 当启动本地服务时html模板是必须提供的
  new HtmlWebpackPlugin(),
  // 这样定义以后，给webpack在编译过程中以及在页面上去判断环境时可以使用process.env.NODE_ENV
  new webpack.DefinePlugin({
    'process.env': {
      // 这里必须写两层引号，不然打包的js文件中会认为process.env.NODE_ENV = development, development是个undefined变量
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  })
]

let config

if (isDev) {
  config = merge(baseConfig, {
    // 帮助在页面上调试代码，因为浏览器看到的webpack编译之后的代码，而我们使用的是vue文件，且js使用的是ES6语法，这样配置之后可以在浏览器debug时直接看到我们写的源代码
    devtool: 'eval-cheap-module-source-map',
    module: {
      rules: [
        // vue-loader@15以后，import样式文件/在vue文件内部 使用css modules都统一在这里配置
        // <style> 标签上的 module 特性仍然需要用来局部注入到组件中
        // 如果你只想在某些 Vue 组件中使用 CSS Modules，你可以使用 oneOf 规则并在 resourceQuery 字符串中检查 module 字符串
        {
          test: /\.styl(us)?$/,
          oneOf: [
            // 这里匹配`<style module>`
            {
              resourceQuery: /module/,
              use: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
                    camelCase: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    // 因为stylus-loader可以生成sourceMap,postcss也可以生成
                    // 当前一个loader已经生成了sourceMap，postcss直接使用生成好的sourceMap就可以了，提高编译效率
                    sourceMap: true
                  }
                },
                'stylus-loader'      // 帮助加载stylus文件，转成css代码
              ]
            },
            // 这里匹配普通的 `<style>` 或 `<style scoped>`
            {
              use: [
                'vue-style-loader',
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    // 因为stylus-loader可以生成sourceMap,postcss也可以生成
                    // 当前一个loader已经生成了sourceMap，postcss直接使用生成好的sourceMap就可以了，提高编译效率
                    sourceMap: true
                  }
                },
                'stylus-loader'      // 帮助加载stylus文件，转成css代码
              ]
            }
          ],
        }
      ]
    },
    devServer,
    plugins: defaultPlugin
  })
} else {
  config = merge(baseConfig, {
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // 为 CSS 内的图片、文件等外部资源指定一个自定义的公共路径
                // 默认值：webpackOptions.output 选项中的 publicPath
                publicPath: './'
              }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                // 因为stylus-loader可以生成sourceMap,postcss也可以生成
                // 当前一个loader已经生成了sourceMap，postcss直接使用生成好的sourceMap就可以了，提高编译效率
                sourceMap: true
              }
            },
            'stylus-loader'      // 帮助加载stylus文件，转成css代码
          ]
        }
      ]
    },
    plugins: defaultPlugin.concat([
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      new MiniCssExtractPlugin({
        filename: '[name].[chunkhash:8].css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      })
    ])
  })
}

module.exports = config
