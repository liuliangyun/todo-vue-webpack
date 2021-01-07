<template>
  <input
    type="text"
    class="todo-add"
    autofocus
    placeholder="接下来做什么"
    @keyup.enter="addTodo"
  />
</template>

<script>
export default {
  methods: {
    addTodo (e) {
      this.$emit('enter', e.target.value)
      e.target.value = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
 .todo-add
   position relative
   margin 0
   width 100%
   font-size 24px
   font-family inherit
   font-weight inherit
   line-height 1.4em
   border none
   outline none
   color inherit
   box-sizing border-box
   font-smoothing antialiased
   padding 16px 16px 16px 36px
   border none
   box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
</style>
