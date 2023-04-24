import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import Questions from '../components/Questions'
import { getQuestions } from '../api/question'

const SIZE = 5
export default function Home() {
  const [datas, setData] = useState([])
  const [offset, setOffset] = useState(1)
  const [pageBtn, setPageBtn] = useState([1])

  const makePageBtn = totalElements => {
    const needPage = Math.ceil(totalElements / SIZE)
    const newPageBtn = Array(needPage)
      .fill()
      .map((_, i) => i + 1)
    return newPageBtn
  }

  const handlePage = btn => {
    setOffset(btn)
  }

  useEffect(() => {
    async function makePage() {
      await getQuestions({ page: offset, size: SIZE }).then(({ data, pageInfo }) => {
        const newPageBtn = makePageBtn(pageInfo.totalElements)
        setData(data)
        setPageBtn(newPageBtn)
      })
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
            className={offset === btn ? styles.clickedBtn : styles.pageBtn}
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
