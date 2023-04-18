import styles from '../pages/MyPage.module.scss'

function Profile({ data, onChange, type }) {
  const label = { name: 'Display name', title: 'Title', content: 'About me' }

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={type} className={styles.inputTitle}>
        {label[type]}
      </label>
      <input id={type} type='text' value={data} onChange={onChange} />
    </div>
  )
}

export default Profile
