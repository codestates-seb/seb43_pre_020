import { Link, useParams } from 'react-router-dom'
import styles from '../pages/Home.module.scss'

function Questions({ data }) {
  const { id } = useParams()
  return (
    <div className={styles.questionContainer}>
      <div className={styles.aside}>
        <div>{data.votes} votes</div>
        <span className={data.select ? styles.answers : styles.select}>{data.answers} answers</span>
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
