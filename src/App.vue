<template>
  <button id="test" @click="clickButton">{{text}}</button>
</template>

<script>
  export default {  
    data () {
      return {
        text: 'abc'
      }
    },
    methods: {
      clickButton () {
        console.log('click')
      }
    }
  }
</script>

<style>
  #test {
    color: red;
  } 
</style>