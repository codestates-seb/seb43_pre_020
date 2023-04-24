import { useSelector } from 'react-redux'
// import { useEffect, useState } from 'react'
import styles from './MyPage.module.scss'
import Profile from '../components/Profile'
import axios from '../api/instance'
import useRouter from '../hooks/useRouter'

export default function MyPage() {
  const { userInfo } = useSelector(state => state.auth)
  const { routeTo } = useRouter()

  const onSubmit = async event => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const displayName = formData.get('displayName')
    const title = formData.get('title')
    const aboutMe = formData.get('aboutMe')

    await axios.patch(`/members/${userInfo.memberId}`, {
      displayName,
      title,
      aboutMe,
    })

    routeTo(`/members/${userInfo.memberId}`)
  }

  const list = ['displayName', 'title', 'aboutMe']

  return (
    <div className={styles.myPageContainer}>
      <div>
        <h1 className={styles.headName}>{userInfo.displayName || 'Display name'}</h1>
        <h3 className={styles.headTitle}>{userInfo.title || 'Title'}</h3>
        <p className={styles.headContent}>{userInfo.aboutMe || 'About me'}</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          {list.map(element => (
            <Profile key={element} type={element} />
          ))}
        </div>
        <button type='submit' className={styles.btn}>
          Save profile
        </button>
      </form>
    </div>
  )
}
