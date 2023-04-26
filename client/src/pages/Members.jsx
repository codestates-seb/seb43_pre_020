import { useEffect, useState } from 'react'
import Member from './Member'
import styles from './Members.module.scss'
import { getAllMembersData } from '../api/user'

const SIZE = 12
function Members() {
  const [members, setMembers] = useState()

  useEffect(() => {
    getAllMembersData({ page: 1, size: SIZE }).then(({ data, pageInfo }) => {
      setMembers(data)
      console.log(pageInfo)
    })
  }, [])

  return (
    <div className={styles.container}>
      <div>Users</div>
      <div className={styles.cardWrap}>
        {members?.map(member => {
          return (
            <div className={styles.card}>
              <Member key={member.memberId} id={member.memberId} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Members
