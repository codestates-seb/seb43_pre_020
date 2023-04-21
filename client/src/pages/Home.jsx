import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import Questions from '../components/Questions'
import getQuestions from '../api/question'

const SIZE = 5
export default function Home() {
  const [datas, setData] = useState([])
  const [pageInfo, setPageInfo] = useState({})
  const [offset, setOffset] = useState(1)
  const [pageBtn, setPageBtn] = useState([1])

  const makePageBtn = totalElements => {
    const needPage = Math.ceil(totalElements / SIZE)
    const newPageBtn = Array(needPage)
      .fill()
      .map((el, i) => i + 1)
    setPageBtn(newPageBtn)
  }

  const handlePage = btn => {
    console.log(1)
    setOffset(btn)
  }

  useEffect(() => {
    async function makePage() {
      await getQuestions({ page: offset, size: SIZE }).then(res => {
        setData(res.data)
        setPageInfo(res.pageInfo)
      })
      makePageBtn(pageInfo.totalElements)
    }
    makePage()
  }, [offset])

  return (
    <div className={styles.homeContainer}>
      <HomeHeader length={datas.length} />
      {datas.map(d => {
        return (
          <div key={d.questionId}>
            <div className={styles.line} />
            <Questions data={d} />
          </div>
        )
      })}
      {pageBtn.map(btn => {
        return (
          <button
            key={btn}
            type='button'
            className={styles.pageBtn}
            onClick={() => handlePage(btn)}
          >
            {btn}
          </button>
        )
      })}
    </div>
  )
}

function HomeHeader({ length }) {
  return (
    <div>
      <div className={styles.homeHeader}>
        <h2>All Questions</h2>
        <Link to='/ask' className={styles.btn}>
          Ask Question
        </Link>
      </div>
      <h3>{length} questions</h3>
    </div>
  )
}
