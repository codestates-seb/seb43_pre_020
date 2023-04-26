import { useSelector } from 'react-redux'
import styles from './MyPage.module.scss'
import Profile from '../components/Profile'
import useRouter from '../hooks/useRouter'
import { changeUserInfo } from '../api/user'
import ImgInput from '../components/ImgInput'
import calDate from '../utils/calDate'
import calJoinDate from '../utils/calJoinDate'

export default function MyPage() {
  const { userInfo } = useSelector(state => state.auth)
  const { routeTo } = useRouter()

  const profileImg = userInfo.imageFileName
    ? `${process.env.REACT_APP_IMAGE_URL}${userInfo.imageFileName}`
    : `${process.env.PUBLIC_URL}/assets/profile.png`

  const joinDate = calJoinDate(userInfo.createdAt)
  const activeDate = calDate(userInfo.lastActivityTime)

  const onSubmit = async event => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const displayName = formData.get('displayName')

    const title = formData.get('title') || ''
    const aboutMe = formData.get('aboutMe') || ''
    const image = formData.get('image')

    const data = new FormData()
    const blob = new Blob([JSON.stringify({ displayName, title, aboutMe })], {
      type: 'application/json',
    })

    data.append('memberPatchDto', blob)
    data.append('memberImage', image)

    const response = await changeUserInfo(userInfo.memberId, data)
    if (response.status !== 200) {
      alert('유저 정보 수정에 실패했습니다.')
      return
    }

    routeTo(`/members/${userInfo.memberId}`)
  }

  const list = ['displayName', 'title', 'aboutMe']

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.header}>
        <img src={profileImg} alt='프로필 이미지' className={styles.profileImg} />
        <span>
          <h1 className={styles.headName}>{userInfo?.displayName || 'Display name'}</h1>
          <h3 className={styles.headTitle}>{userInfo?.title || 'Title'}</h3>
          <div className={styles.dateContainer}>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/cake.svg`} alt='cake' />
            <span>Member {joinDate}</span>
            <img src={`${process.env.PUBLIC_URL}/assets/icons/clock.svg`} alt='clock' />
            <span>Last seen {activeDate}</span>
          </div>
          <p className={styles}>{userInfo?.aboutMe || 'About me'}</p>
        </span>

      </div>
      <form onSubmit={onSubmit}>
        <div className={styles.inputBox}>
          <ImgInput initial={profileImg} />
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
