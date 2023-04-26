import styles from '../pages/MyPage.module.scss'

function Profile({ type }) {
  const label = { displayName: 'Display name', title: 'Title', aboutMe: 'About me' }

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={type} className={styles.inputTitle}>
        {label[type]}
      </label>
      <input
        id={type}
        name={type}
        type='text'
        onKeyDown={e => e.code === 'Enter' && e.preventDefault()}
        required
      />
    </div>
  )
}

export default Profile
