import { Link } from 'react-router-dom'
import styles from './Nav.module.scss'
import { navContent } from '../router/routerData'
import useRouter from '../hooks/useRouter'

export default function Nav() {
  const { currentPath } = useRouter()
  const getClassName = path =>
    currentPath.split('/')[1] === path.slice(1) ? styles.itemActive : styles.item

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
