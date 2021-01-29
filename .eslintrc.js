// .eslintrc文件的命名方式被deprecated
module.exports = {
  extends: [
    "standard",
    "plugin:vue/recommended"  //高版本使用plugin:vue/recommended表示引用eslint-plugin-vue
  ],
  plugins: [
    'vue'
  ]
}
