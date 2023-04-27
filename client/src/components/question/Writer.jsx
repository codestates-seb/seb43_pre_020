import { Link } from 'react-router-dom'
import calDate from '../../utils/calDate'
import styles from '../../pages/Question.module.scss'

export default function Writer({ type, date, writer, writerId, writerImg }) {
  const label = type === 'question' ? 'Asked' : 'Answered'

  return (
    <div className={styles.writer}>
      {writerImg ? (
        <img
          className={styles.profileImg}
          src={`${process.env.REACT_APP_IMAGE_URL}${writerImg}`}
          alt='writer'
        />
      ) : (
        <img
          className={styles.profileImg}
          src={`${process.env.PUBLIC_URL}/assets/profile.png`}
          alt='default img'
        />
      )}
      <div className={styles.rightSide}>
        <div className={styles.date}>
          {label} {calDate(date)}
        </div>
        <div className={styles.questioner}>
          <Link to={`/members/${writerId}`}>{writer}</Link>
        </div>
      </div>
    </div>
  )
}
