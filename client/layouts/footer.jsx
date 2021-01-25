import styles from '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'lyliu'
    }
  },
  render () {
    return (
      <div class={styles.todoFooter}>
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
