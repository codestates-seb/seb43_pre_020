import MDEditor from '@uiw/react-md-editor'
import styles from '../pages/Question.module.scss'

function AnswerForm() {
  return (
    <div className={styles.AnswerContainer} data-color-mode='light'>
      <h1>Your Answer</h1>
      <MDEditor id='body' preview='edit' required />
      <button className={styles.AnswerBtn} type='submit'>
        Post your Answer
      </button>
    </div>
  )
}

export default AnswerForm
