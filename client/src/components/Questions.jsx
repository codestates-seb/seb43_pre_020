import { Link, useParams } from 'react-router-dom'
import styles from '../pages/Home.module.scss'

function calDate(date) {
  const created = new Date(date)
  const difference = new Date() - created
  if (difference < 1000 * 60) {
    return 'now'
  }
  if (difference < 1000 * 60 * 60) {
    const minute = parseInt(difference / (1000 * 60), 10)
    return `${minute}분 전`
  }
  if (difference < 1000 * 60 * 60 * 24) {
    const hour = parseInt(difference / (1000 * 60 * 60), 10)
    return `${hour}시간 전`
  }
  if (difference < 1000 * 60 * 60 * 24 * 7) {
    const day = parseInt(difference / (1000 * 60 * 60 * 24), 10)
    return `${day}일 전`
  }
  if (difference < 1000 * 60 * 60 * 24 * 7 * 4) {
    const week = parseInt(difference / (1000 * 60 * 60 * 24 * 7), 10)
    return `${week}주 전`
  }
  if (difference < 1000 * 60 * 60 * 24 * 7 * 4 * 12) {
    const month = parseInt(difference / (1000 * 60 * 60 * 24 * 7 * 4), 10)
    return `${month}개월 전`
  }
  const year = created.getFullYear()
  const month = created.getMonth() + 1
  const dates = created.getDate()
  return `${year}년 ${month}월 ${dates}일`
}

function Questions({ data }) {
  const { id } = useParams()
  const date = calDate(data.date)

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
            <span className={styles.date}>{date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Questions
