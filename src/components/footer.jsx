// import styles from '../assets/styles/footer.styl'

export default {
  data () {
    return {
      author: 'lyliu'
    }
  },
  render () {
    return (
      <div>
        <span>Written by {this.author}</span>
      </div>
    )
  }
}
