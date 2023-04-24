import { Link } from 'react-router-dom'
import styles from '../pages/Home.module.scss'
import calDate from '../utils/calDate'

function Questions({ data }) {
  const date = calDate(data.date)

  return (
    <div className={styles.questionContainer}>
      <div className={styles.aside}>
        <div>{data.votes} votes</div>
        <span className={data.select ? styles.answers : styles.select}>
          {data.answers.length} answers
        </span>
      </div>
      <div className={styles.questionBox}>
        <div>
          <Link to={`/questions/${data.questionId}`}>{data.title} </Link>
          <div className={styles.content}>{data.content}</div>
          <div className={styles.nameAndDate}>
            <Link to={`/members/${data.memberId}`} className={styles.questioner}>
              {data.questioner}
            </Link>
            <span className={styles.date}>{date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questions
