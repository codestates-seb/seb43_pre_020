import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import styles from './MyPage.module.scss'
import Profile from '../components/Profile'
import axios from '../api/instance'

export default function MyPage() {
  const { userInfo } = useSelector(state => state.auth)
  const [data, setData] = useState({
    displayName: '',
    title: '',
    aboutMe: '',
  })

  useEffect(() => {
    const { displayName, title, aboutMe } = userInfo
    setData({ displayName, title, aboutMe })
  }, [])

  const onChange = e => {
    const { id, value } = e.target
    setData(prev => {
      return { ...prev, [id]: value }
    })
  }

  const body = JSON.stringify({
    displayName: data.displayName,
    title: data.title,
    aboutMe: data.aboutMe,
  })

  const onSubmit = e => {
    e.preventDefault()
    axios.patch(`/members/${userInfo.memberId}`, body).then(res => {
      const { displayName, title, aboutMe } = res.data
      setData({ displayName, title, aboutMe })
    })
  }

  const list = ['displayName', 'title', 'aboutMe']

  return (
    <div className={styles.myPageContainer}>
      <div>
        <h1 className={styles.headName}>{data.displayName}</h1>
        <h3 className={styles.headTitle}>{data.title}</h3>
        <p className={styles.headContent}>{data.aboutMe}</p>
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
