import { Link } from 'react-router-dom'
import styles from './Home.module.scss'
import Questions from '../components/Questions'
import data from './data'

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <HomeHeader data={data} />
      {data.map(d => {
        return (
          <div key={d.id}>
            <div className={styles.line} />
            <Questions data={d} />
          </div>
        )
      })}
    </div>
  )
}

function HomeHeader() {
  return (
    <div>
      <div className={styles.homeHeader}>
        <h2>All Questions</h2>
        <Link to='/ask' className={styles.btn}>
          Ask Question
        </Link>
      </div>
      <h3>{data.length} questions</h3>
    </div>
  )
}
