import styles from './Nav.module.scss'

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>Questions</li>
        <li>Tags</li>
        <li>Users</li>
        <li>Companies</li>
      </ul>
    </nav>
  )
}
