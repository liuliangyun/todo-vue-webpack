import Vue from 'vue'
import App from './App.vue'
import './assets/styles/test.css'
import './assets/styles/test-stylus.styl'
import './assets/images/bg.jpg'

const root = document.createElement('div')
document.body.appendChild(root)

// $mount将Vue创建的组件挂载到root节点
new Vue({
  render: (h) => h(App)
}).$mount(root)