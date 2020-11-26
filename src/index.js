import Vue from 'vue'
import App from './App.vue'
import './styles/global.scss'

const root = document.createElement('div')
document.body.appendChild(root)

// $mount将Vue创建的组件挂载到root节点
new Vue({
  el: 'div',
  render: (h) => h(App)
})