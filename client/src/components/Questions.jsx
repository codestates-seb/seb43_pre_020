import { Link, useParams } from 'react-router-dom'
import styles from '../pages/Home.module.scss'

function Questions({ data }) {
  const { id } = useParams()
  const date = new Date(data.date)
  const YEAR = date.getFullYear()
  const MONTH = date.getMonth() + 1
  const DATE = date.getDate()

  return (
    <div className={styles.questionContainer}>
      <div className={styles.aside}>
        <div>{0} votes</div>
        <span className={data.select ? styles.answers : styles.select}>
          {data.answers.length} answers
        </span>
      </div>
      <div className={styles.questionBox}>
        <div>
          <Link to={`/questions/${id}`}>{data.title} </Link>
          <div className={styles.content}>{data.content}</div>
          <div className={styles.nameAndDate}>
            <span className={styles.questioner}>{data.questioner}</span>
            <span className={styles.date}>{`${YEAR}-${MONTH}-${DATE}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questions
