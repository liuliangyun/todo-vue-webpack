module.exports = (isDev) => {
  return {
    //忽略vue template中的空格
    preserveWhitespace: true,
    cssModules: {},
    // hotReload: false,  // 根据环境变量生成
  }
}
