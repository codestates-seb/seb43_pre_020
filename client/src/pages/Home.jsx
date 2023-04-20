import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import Questions from '../components/Questions'
import axios from '../api/instance'

export default function Home() {
  const [datas, setData] = useState([])

  const getData = async ({ page, size }) => {
    const query = `page=${page}&size=${size}`
    try {
      const { data } = await axios.get(`/questions?${query}`)
      setData(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getData({ page: 0, size: 6 })
  }, [])

  return (
    <div className={styles.homeContainer}>
      <HomeHeader datas={datas} />
      {datas.map(d => {
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

function HomeHeader({ datas }) {
  return (
    <div>
      <div className={styles.homeHeader}>
        <h2>All Questions</h2>
        <Link to='/ask' className={styles.btn}>
          Ask Question
        </Link>
      </div>
      <h3>{datas.length} questions</h3>
    </div>
  )
}
