import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './Members.module.scss'
import calDate from '../utils/calDate'
import calJoinDate from '../utils/calJoinDate'

const initialData = {
  displayName: '',
  title: '',
  joinDate: new Date(),
  lastActivityDate: new Date(),
  aboutMe: '',
}

export default function Members() {
  const [memberData, setMemberData] = useState(initialData)
  const { memberId } = useParams()
  useEffect(() => {
    axios.get(`http://localhost:4000/members`).then(({ data }) => {
      data.forEach(d => {
        if (d.memberId === memberId) {
          setMemberData(d)
        }
      })
    })
  }, [])
  const joinDate = calJoinDate(memberData.joinDate)
  const activeDate = calDate(memberData.lastActivityDate)

  return (
    <div className={styles.memberContainer}>
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
  )
}
