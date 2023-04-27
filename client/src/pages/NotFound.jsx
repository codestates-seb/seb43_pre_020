import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <img
          className={styles.logo}
          src={`${process.env.PUBLIC_URL}/assets/logo.svg`}
          alt='stack overflow'
        />
        <p className={styles.title}>원하시는 페이지를 찾을 수 없습니다</p>
        <p className={styles.content}>
          찾으려는 페이지의 주소가 잘못 입력되었거나,
          <br />
          주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
          <br />
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
        </p>
        <Link className={styles.link} to='/'>
          Go to Home
        </Link>
      </div>
    </div>
  )
}
