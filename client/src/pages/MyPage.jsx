import { useSelector } from 'react-redux'
import styles from './MyPage.module.scss'
import Profile from '../components/Profile'
import useRouter from '../hooks/useRouter'
import { changeUserInfo } from '../api/user'

export default function MyPage() {
  const { userInfo } = useSelector(state => state.auth)
  const { routeTo } = useRouter()

  const onSubmit = async event => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const displayName = formData.get('displayName')
    const title = formData.get('title')
    const aboutMe = formData.get('aboutMe')
    const body = { displayName, title, aboutMe }

    const response = await changeUserInfo(userInfo.memberId, body)
    if (response === 'Fail') {
      alert('유저 정보 수정에 실패했습니다.')
      return
    }

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
