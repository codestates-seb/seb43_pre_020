import MDEditor from '@uiw/react-md-editor'
import styles from '../pages/Ask.module.scss'

function AskForm({ data, onChange, writeDone, setWriteDone }) {
  const onPreviewSubmit = e => {
    e.preventDefault()
    setWriteDone(!writeDone)
  }

  return (
    <form onSubmit={onPreviewSubmit}>
      <div className={styles.titleContainer}>
        <label htmlFor='title' className={styles.title}>
          Title
        </label>
        <p>{`Be specific and imagine you're asking a question to another person.`}</p>
        <input
          id='title'
          type='text'
          className={styles.titleInput}
          value={data.title}
          onChange={onChange}
          placeholder='제목을 입력하세요'
          required
        />
      </div>
      <div className={styles.bodyContainer}>
        <label htmlFor='body' className={styles.body}>
          Body
        </label>
        <p>
          The body of your question contains your problem details and results. Minimum 30
          characters.
        </p>
        <MDEditor id='body' value={data.content} onChange={onChange} preview='edit' required />
      </div>
      <button className={styles.btn} type='submit'>
        Post your question
      </button>
    </form>
  )
}

export default AskForm
