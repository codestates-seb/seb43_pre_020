import MDEditor from '@uiw/react-md-editor'
import axios from '../api/instance'
import styles from '../pages/Ask.module.scss'

const BODYTEXT =
  'The body of your question contains your problem details and results. Minimum 30 characters.'

function Preview({ data, writeDone, setWriteDone }) {
  const onAmendClick = () => {
    setWriteDone(!writeDone)
  }

  const body = JSON.stringify({
    title: data.title,
    content: data.content,
    memberId: 1,
  })

  const onSubmit = e => {
    e.preventDefault()
    axios.post('/questions', body).then(res => {
      if (!res.ok) {
        alert('질문 등록에 실패했습니다.')
      } else {
        window.location.replace('http://localhost:3000/')
      }
    })
  }

  return (
    <div>
      <TitleForm title={data.title} />
      <form className={styles.preview} onSubmit={onSubmit}>
        <div className={styles.bodyContainer}>
          <h2 className={styles.body}>Body</h2>
          <p>{BODYTEXT}</p>
          <MDEditor.Markdown className={styles.bodyPreview} source={data.content} />
        </div>
        <button className={styles.btn} type='submit'>
          Post your question
        </button>
        <button className={styles.btnAmend} type='button' onClick={onAmendClick}>
          Amend draft
        </button>
      </form>
    </div>
  )
}

export default Preview

function TitleForm({ title }) {
  return (
    <div className={styles.titleContainer}>
      <h2 className={styles.title}>Title</h2>
      <p>{`Be specific and imagine you're asking a question to another person`}</p>
      <div className={styles.titlePreview}>{title}</div>
    </div>
  )
}
