<template>
  <div :class="['todo-item', todo.completed ? 'completed' : '']">
    <input
      :id="todo.id"
      type="checkbox"
      class="toggle"
      :checked="todo.completed"
      @click="handleToggle"
    >
    <label :for="todo.id">{{ todo.content }}</label>
    <button
      class="destroy"
      @click="deleteTodo"
    />
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      required: true,
      type: Object
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('del', this.todo.id)
    },
    handleToggle (e) {
      e.preventDefault()
      this.$emit('toggle', this.todo)
    }
  }
}
</script>

<style lang="stylus">
 .todo-item
   position relative
   background-color #fff
   font-size 24px
   border-bottom 1px solid rgba(0,0,0,0.06)
   &:hover
     .destroy:after
       content 'x'
   label
     white-space pre-line
     word-break break-all
     padding 15px 60px 15px 15px
     margin-left 45px
     display block
     line-height 1.2
     transition color 0.4s
   .toggle
     text-align center
     width 50px
     height 30px
     position absolute
     top 0
     bottom 0
     margin auto 0
     border none
     appearance none
     outline none
     &:after
       content url('/client/assets/images/unChecked.svg')
   .destroy
     position absolute
     top 0
     right 10px
     bottom 0
     width 40px
     height 40px
     margin auto 0
     font-size 30px
     color #cc9a9a
     margin-bottom 11px
     transition color 0.2s ease-out
     background-color transparent
     appearance none
     border-width 0
     cursor pointer
     outline none
   &.completed
     label
       color #d9d9d9
       text-decoration line-through
     .toggle:after
       content url('/client/assets/images/checked.svg')
</style>
