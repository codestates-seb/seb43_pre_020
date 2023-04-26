import styles from './Spinner.module.scss'

export default function Spinner({ label }) {
  return (
    <div className={styles.box}>
      <div className={styles.ldsRing}>
        <div />
        <div />
        <div />
        <div />
      </div>
      <p>
        <span className={styles.label}>{label}</span> is loading...
      </p>
    </div>
  )
}
