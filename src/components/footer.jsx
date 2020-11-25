import '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'lyliu'
    }
  },
  render () {
    return (
      <div id="todo-footer">
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
