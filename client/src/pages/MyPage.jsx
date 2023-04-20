import { useState } from 'react'
import styles from './MyPage.module.scss'
import Profile from '../components/Profile'

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

  const list = ['name', 'title', 'content']

  return (
    <div className={styles.myPageContainer}>
      <div>
        <h1 className={styles.headName}>Name</h1>
        <h3 className={styles.headTitle}>Title</h3>
        <p className={styles.headContent}>About me</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          {list.map(element => (
            <Profile key={element} type={element} data={data[element]} onChange={onChange} />
          ))}
        </div>
        <button type='submit' className={styles.btn}>
          Save profile
        </button>
      </form>
    </div>
  )
}
