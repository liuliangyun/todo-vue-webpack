<template>
  <section id="todo-app">
    <Add @enter="addTodo" />
    <Todo
      v-for="todo in filterTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
      @toggle="toggleTodoState"
    />
    <Tabs
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clear="clearCompletedTodos"
    />
  </section>
</template>

<script>
import Add from './add.vue'
import Todo from './todo.vue'
import Tabs from './tabs.vue'

let index = 0
export default {
  components: {
    Add,
    Todo,
    Tabs
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  computed: {
    filterTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const isCompleted = this.filter === 'completed'
      return this.todos.filter(todo => todo.completed === isCompleted)
    }
  },
  methods: {
    addTodo (value) {
      this.todos.unshift({
        id: index++,
        content: value,
        completed: false
      })
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => id === todo.id), 1)
    },
    toggleTodoState (todo) {
      todo.completed = !todo.completed
      this.todos.splice(this.todos.findIndex(t => t.id === todo.id), 1, todo)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearCompletedTodos () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus">
 #todo-app
   width 600px
   margin 0 auto
   box-shadow 0 0 5px #666
</style>
