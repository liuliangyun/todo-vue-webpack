<template>
  <div id="app">
    <Header></Header>
    <Todos></Todos>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/header.vue'
  import Footer from './components/footer.jsx'
  import Todos from './todos/index.vue'

  export default {
    components: {
      Header,
      Footer,
      Todos
    },
  }
</script>

<style lang="stylus" scoped>
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
