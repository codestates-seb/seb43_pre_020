import { Link, useParams } from 'react-router-dom'
import styles from '../pages/Home.module.scss'

function Questions({ data }) {
  const { id } = useParams()
  return (
    <div className={styles.questionContainer}>
      <div className={styles.aside}>
        <div className={styles.votes}>{data.votes} votes</div>
        <div className={styles.answers}>{data.answers} answers</div>
      </div>
      <div className={styles.questionBox}>
        <div>
          <Link to={`/questions/${id}`}>{data.title} </Link>
          <div className={styles.content}>{data.content}</div>
          <div className={styles.date}>
            {data.questioner} {data.date}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questions
