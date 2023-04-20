import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.scss'

export default function Nav() {
  const { pathname } = useLocation()

  const linkMap = [
    { id: 1, label: 'Questions', path: '/' },
    { id: 2, label: 'Tags', path: '/tags' },
    { id: 3, label: 'Users', path: '/mypage' },
    { id: 4, label: 'Companies', path: '/companies' },
  ]

  const isActive = path => pathname === path

  const isQuestion = label =>
    label === 'Questions' && (pathname === '/' || pathname.includes('/questions'))

  return (
    <nav className={styles.nav}>
      {linkMap.map(link => (
        <Link
          key={link.id}
          to={link.path}
          className={isActive(link.path) ? styles.itemActive : styles.item}
        >
          {isQuestion(link.label) && (
            <img src={`${process.env.PUBLIC_URL}/assets/icons/globe.svg`} alt='Questions' />
          )}
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
