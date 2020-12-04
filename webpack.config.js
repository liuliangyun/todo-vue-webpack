const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将css提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 每次webpack build成功之后清除之前的 webpack's output.path 目录下的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  // 因为开发的是web应用
  target: "web",
  // 定义app的入口，为一个js文件
  entry: path.join(__dirname, 'src/index.js'),
  // 定义webpack打包后的出口，包括打包文件名和存储路径
  output: {
    // 开发环境dev server不能使用chunk hash，正式环境要使用chunk hash
    filename: 'bundle.[hash:8].js',
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
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: [
          // 帮助将图片转换为base64代码直接写到js中，而不用生成一个新的文件，对于小图片十分实用
          {
            loader: 'url-loader',    //将小于1024d的图片转为base64，减少http请求
            options: {
              limit: 1024 * 10,
              name: '[name].[ext]',
              outputPath: 'assets/img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
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
  ],
  optimization: {
    // 对于动态导入模块，默认使用 webpack v4+ 提供的全新的通用分块策略(common chunk strategy)。请在 SplitChunksPlugin 页面中查看配置其行为的可用选项。
    // Since webpack v4, the CommonsChunkPlugin was removed in favor of optimization.splitChunks.
    splitChunks: {
      chunks (chunk) {
        // exclude `my-excluded-chunk`
        return chunk.name !== 'my-excluded-chunk'
      }
    }
  }
}

if (isDev) {
  config.module.rules.push(
    {
      test: /\.styl(us)?$/,
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
  )
  // 帮助在页面上调试代码，因为浏览器看到的webpack编译之后的代码，而我们使用的是vue文件，且js使用的是ES6语法，这样配置之后可以在浏览器debug时直接看到我们写的源代码
  config.devtool = 'eval-cheap-module-source-map'

  // devServer启动后是一个服务，设定host和port
  config.devServer = {
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
} else {
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
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
  )

  config.plugins.push(
    // Options similar to the same options in webpackOptions.output
    // all options are optional
    new MiniCssExtractPlugin({
      filename: 'styles.[chunkhash].[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    })
  )
}

module.exports = config
