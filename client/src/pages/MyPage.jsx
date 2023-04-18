import { useState } from 'react'
import styles from './MyPage.module.scss'

export default function MyPage() {
  const [data, setData] = useState({
    name: 'Initial',
    title: 'Title',
    content: 'About me',
  })

  const onChange = e => {
    const { id, value } = e.target
    setData(prev => {
      return { ...prev, [id]: value }
    })
  }

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className={styles.myPageContainer}>
      <div>
        <h1 className={styles.headName}>{data.name}</h1>
        <h3 className={styles.headTitle}>{data.title}</h3>
        <p className={styles.headContent}>{data.content}</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          <div className={styles.inputContainer}>
            <label htmlFor='name' className={styles.inputTitle}>
              Display name
            </label>
            <input id='name' type='text' value={data.name} onChange={onChange} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='title' className={styles.inputTitle}>
              Title
            </label>
            <input id='title' type='text' value={data.title} onChange={onChange} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='content' className={styles.inputTitle}>
              About me
            </label>
            <input id='content' type='textarea' value={data.content} onChange={onChange} />
          </div>
        </div>
        <button type='submit' className={styles.btn}>
          Save profile
        </button>
      </form>
    </div>
  )
}
