import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.scss'
import { navContent } from '../router/routerData'

export default function Nav() {
  const { pathname } = useLocation()
  const getClassName = path => (pathname === path ? styles.itemActive : styles.item)

  return (
    <nav className={styles.nav}>
      {navContent.map(({ id, path, label }) => (
        <Link key={id} to={path} className={getClassName(path)}>
          <Label label={label} />
        </Link>
      ))}
    </nav>
  )
}

function Label({ label }) {
  const isQuestion = label === 'Questions'
  return (
    <>
      {isQuestion && (
        <img src={`${process.env.PUBLIC_URL}/assets/icons/globe.svg`} alt='Questions' />
      )}
      {label}
    </>
  )
}
