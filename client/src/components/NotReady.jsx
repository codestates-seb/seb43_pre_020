import styles from '../pages/NotFound.module.scss'

export default function NotReady({ label }) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <p className={styles.title}>{label} is coming soon</p>
        <p className={styles.content}>We are working hard to get {label} ready for you.</p>
      </div>
    </div>
  )
}
