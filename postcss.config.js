// postcss帮助后处理css，优化css代码
// autoprefixer是帮助需要加浏览器前缀的css属性自动加上前缀
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    autoprefixer()
  ]
}