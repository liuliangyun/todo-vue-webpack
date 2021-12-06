// .eslintrc文件的命名方式被deprecated
module.exports = {
  extends: [
    "standard",
    "plugin:vue/recommended"  //高版本使用plugin:vue/recommended表示引用eslint-plugin-vue
  ],
  plugins: [
    'vue'
  ],
  // 希望每次改代码都能自动做eslint的检查，可以使用eslint-loader
  // 经过babel处理过的代码，eslint可能不太支持，因此一般使用webpack和eslint的项目都会使用babel-eslint进行解析
  parserOptions: {
    parser: "babel-eslint"
  }
}
