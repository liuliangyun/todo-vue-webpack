import Vue from 'vue'
import App from './App.vue'
import './assets/styles/global.styl'
// import './assets/styles/test.css'

const root = document.createElement('div')
document.body.appendChild(root)

// $mount将Vue创建的组件挂载到root节点
new Vue({
  render: (h) => h(App)
}).$mount(root)