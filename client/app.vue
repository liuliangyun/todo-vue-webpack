<template>
  <div id="app">
    <Header />
    <Todos />
    <Footer />
  </div>
</template>

<script>
import Header from './layouts/header.vue'
import Footer from './layouts/footer.jsx'
import Todos from './views/todo/index.vue'

export default {
  components: {
    Header,
    Footer,
    Todos
  }
}
</script>

<style lang="stylus">
   #app
     position absolute
     left 0
     right 0
     top 0
     bottom 0
     #cover
       position absolute
       left 0
       right 0
       top 0
       bottom 0
       background-color #999
       opacity 0.2
       z-index -1
</style>
