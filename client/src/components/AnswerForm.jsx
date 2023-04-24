import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import styles from '../pages/Question.module.scss'
import { postAnswer } from '../api/question'

function AnswerForm({ id, memberId, send, setSend }) {
  const [body, setBody] = useState('')
  const handleChange = value => {
    setBody(value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    postAnswer({ id, body, memberId }).then(res => {
      if (res === 'success') {
        setSend(send + 1)
        setBody('')
      }
    })
  }
  return (
    <div className={styles.AnswerContainer} data-color-mode='light'>
      <h1>Your Answer</h1>
      <form onSubmit={handleSubmit}>
        <MDEditor id='body' preview='edit' value={body} onChange={handleChange} required />
        <button className={styles.AnswerBtn} type='submit'>
          Post your Answer
        </button>
      </form>
    </div>
  )
}

export default AnswerForm
