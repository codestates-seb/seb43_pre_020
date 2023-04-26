import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMemberData } from '../api/user'
import styles from './Member.module.scss'
import calDate from '../utils/calDate'
import calJoinDate from '../utils/calJoinDate'

const initialData = {
  displayName: '',
  title: '',
  createdAt: new Date(),
  lastActivityTime: new Date(),
  aboutMe: '',
  imageFileName: `${process.env.PUBLIC_URL}/assets/profile.png`,
}

export default function Members({ id }) {
  const [memberData, setMemberData] = useState(initialData)
  const { memberId } = useParams()
  useEffect(() => {
    if (id) {
      getMemberData(id).then(
        ({ displayName, title, aboutMe, lastActivityTime, createdAt, imageFileName }) => {
          setMemberData({
            displayName,
            title,
            createdAt,
            lastActivityTime,
            aboutMe,
            imageFileName: imageFileName
              ? `${process.env.REACT_APP_IMAGE_URL}${imageFileName}`
              : `${process.env.PUBLIC_URL}/assets/profile.png`,
          })
        }
      )
    } else {
      getMemberData(memberId).then(
        ({ displayName, title, aboutMe, lastActivityTime, createdAt, imageFileName }) => {
          setMemberData({
            displayName,
            title,
            createdAt,
            lastActivityTime,
            aboutMe,
            imageFileName: imageFileName
              ? `${process.env.REACT_APP_IMAGE_URL}${imageFileName}`
              : `${process.env.PUBLIC_URL}/assets/profile.png`,
          })
        }
      )
    }
  }, [])
  const joinDate = calJoinDate(memberData.createdAt)
  const activeDate = calDate(memberData.lastActivityTime)

  return (
    <div className={styles.memberContainer}>
      <img src={memberData.imageFileName} alt='프로필 이미지' className={styles.profileImg} />
      <div>
        <h2> {memberData.displayName} </h2>
        <h4>{memberData.title}</h4>
        <div className={styles.dateContainer}>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/cake.svg`} alt='cake' />
          <span>Member {joinDate}</span>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/clock.svg`} alt='clock' />
          <span>Last seen {activeDate}</span>
        </div>
        <h3>About</h3>
        <p>{memberData.aboutMe}</p>
      </div>
    </div>
  )
}
