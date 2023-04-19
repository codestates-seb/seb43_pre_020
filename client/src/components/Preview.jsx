import MDEditor from '@uiw/react-md-editor'
import styles from '../pages/Ask.module.scss'

function Preview({ data, writeDone, setWriteDone }) {
  const onAmendClick = () => {
    setWriteDone(!writeDone)
  }

  return (
    <form className={styles.preview}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Title</h2>
        <p>{`Be specific and imagine you're asking a question to another person`}</p>
        <div className={styles.titlePreview}>{data.title}</div>
      </div>
      <div className={styles.bodyContainer}>
        <h2 className={styles.body}>Body</h2>
        <p>
          The body of your question contains your problem details and results. Minimum 30
          characters.
        </p>
        <MDEditor.Markdown className={styles.bodyPreview} source={data.content} />
      </div>
      <button className={styles.btn} type='submit'>
        Post your question
      </button>
      <button className={styles.btnAmend} type='button' onClick={onAmendClick}>
        Amend draft
      </button>
    </form>
  )
}

export default Preview
