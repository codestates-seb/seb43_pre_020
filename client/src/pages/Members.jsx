import styles from './Members.module.scss'
import Member from './Member'

function Members() {
  return (
    <div className={styles.usersContainer}>
      <h2>Users</h2>
      <Member />
    </div>
  )
}

export default Members
