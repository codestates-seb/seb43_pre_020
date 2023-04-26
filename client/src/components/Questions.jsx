import { Link } from 'react-router-dom'
import styles from '../pages/Home.module.scss'
import calDate from '../utils/calDate'

function Questions({ data }) {
  const date = calDate(data.date)
  const select = data.questionStatus === 'QUESTION_ANSWERED'

  return (
    <div className={styles.questionContainer}>
      <div className={styles.aside}>
        <div>{data.votes} votes</div>
        <span className={select ? styles.select : styles.answers}>{data.answers} answers</span>
      </div>
      <div className={styles.questionBox}>
        <div>
          <Link to={`/questions/${data.questionId}`}>{data.title} </Link>
          <div className={styles.content}>{data.content}</div>
          <div className={styles.nameAndDate}>
            {data.imageFileName ? (
              <img
                className={styles.miniProfileImg}
                src={`${process.env.REACT_APP_IMAGE_URL}${data.imageFileName}`}
                alt='questioner'
              />
            ) : (
              <img
                className={styles.miniProfileImg}
                src={`${process.env.PUBLIC_URL}/assets/profile.png`}
                alt='default img'
              />
            )}
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
