import { useSelector } from 'react-redux'
import useRouter from '../../hooks/useRouter'
import calDate from '../../utils/calDate'
import styles from '../../pages/Question.module.scss'

export default function QuestionTitle({ title, date, view }) {
  const { isLogin } = useSelector(state => state.auth)
  const { routeTo } = useRouter()

  const handleClick = () => {
    if (!isLogin) {
      alert('로그인필요!')
    } else {
      routeTo('/ask')
    }
  }

  return (
    <div className={styles.title}>
      <div>
        <h1>{title}</h1>
        <button className={styles.btn} type='button' onClick={handleClick}>
          Ask Question
        </button>
      </div>
      <div className={styles.underTitle}>
        <span>Asked {calDate(date)}</span>
        <span>Views {view}</span>
      </div>
    </div>
  )
}
