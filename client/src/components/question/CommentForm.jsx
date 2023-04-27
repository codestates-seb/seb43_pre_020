import { useRef } from 'react'
import styles from '../../pages/Question.module.scss'

export default function CommentForm({ submitHandler }) {
  const formRef = useRef(null)

  const handleSubmit = event => {
    event.preventDefault()

    const formdata = new FormData(event.currentTarget)
    const comment = formdata.get('comment')
    submitHandler(comment)
    formRef.current.reset()
  }

  return (
    <form ref={formRef} className={styles.addComment} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor='comment'>
        Add comment
      </label>
      <textarea className={styles.input} id='comment' name='comment' required />
      <button className={styles.btn} type='submit'>
        Submit
      </button>
    </form>
  )
}
