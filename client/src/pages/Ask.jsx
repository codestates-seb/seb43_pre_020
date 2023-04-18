import { useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import styles from './Ask.module.scss'

export default function Ask() {
  const [data, setData] = useState({
    title: '',
    content: '',
  })

  const [isSubmit, setIsSubmit] = useState(true)

  const onChange = event => {
    if (event.target) {
      setData(prev => {
        return { ...prev, title: event.target.value }
      })
    } else {
      setData(prev => {
        return { ...prev, content: event }
      })
    }
  }

  const onPreviewSubmit = e => {
    e.preventDefault()
    setIsSubmit(!isSubmit)
  }

  const onAmendClick = () => {
    setIsSubmit(!isSubmit)
  }

  return (
    <div className={styles.ask}>
      <h2 className={styles.headline}>Ask a public question</h2>
      {isSubmit ? (
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
      ) : (
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
      )}
    </div>
  )
}
