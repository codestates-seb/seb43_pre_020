import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../pages/Question.module.scss'
import { postAnswer } from '../api/question'

function AnswerForm({ id, fetchData }) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const [body, setBody] = useState('')
  const handleChange = value => {
    setBody(value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (!isLogin) {
      alert('Please login first')
      return
    }
    postAnswer({ id, body, memberId: userInfo.memberId }).then(res => {
      if (res === 'success') {
        setBody('')
        fetchData()
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
