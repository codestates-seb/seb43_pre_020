import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './Home.module.scss'
import Questions from '../components/Questions'
import { getQuestions } from '../api/question'

const SIZE = 5
export default function Home() {
  const [datas, setData] = useState([])
  const [page, setPage] = useState(1)
  const [pageBtn, setPageBtn] = useState([1])
  const [sortQuery, setSortQuery] = useState('')

  const makePageBtn = totalElements => {
    const needPage = Math.ceil(totalElements / SIZE)
    const newPageBtn = Array(needPage)
      .fill()
      .map((_, i) => i + 1)
    return newPageBtn
  }

  const handlePage = btn => {
    setPage(btn)
  }

  useEffect(() => {
    async function makePage() {
      await getQuestions({ page, size: SIZE }, sortQuery).then(({ data, pageInfo }) => {
        const newPageBtn = makePageBtn(pageInfo.totalElements)
        setData(data)
        setPageBtn(newPageBtn)
      })
    }
    makePage()
  }, [page, sortQuery])

  return (
    <div className={styles.homeContainer}>
      <HomeHeader length={datas.length} setQuery={setSortQuery} />
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
            className={page === btn ? styles.clickedBtn : styles.pageBtn}
            onClick={() => handlePage(btn)}
          >
            {btn}
          </button>
        )
      })}
    </div>
  )
}

function HomeHeader({ length, setQuery }) {
  const [sortedValue, setSortedValue] = useState('questionId')
  const handleClick = e => {
    setSortedValue(e.target.name)
  }

  useEffect(() => {
    switch (sortedValue) {
      case 'questionId':
        setQuery('&sortBy=questionId&direction=DESC')
        break
      case 'votes':
        setQuery('&sortBy=votes&direction=DESC')
        break
      case 'answered':
        setQuery('&answered=false')
        break
      default:
        setQuery('')
    }
  }, [sortedValue])

  const sortBtn = [
    ['Newest', 'questionId'],
    ['Votes', 'votes'],
    ['Unanswered', 'answered'],
  ]

  return (
    <div>
      <div className={styles.homeHeader}>
        <h2>All Questions</h2>
        <Link to='/ask' className={styles.btn}>
          Ask Question
        </Link>
      </div>
      <div className={styles.secondLine}>
        <h3>{length} questions</h3>
        <div className={styles.sortBtnBox}>
          {sortBtn.map(btn => {
            return (
              <button
                key={btn[0]}
                type='button'
                name={btn[1]}
                onClick={handleClick}
                className={sortedValue === btn[1] ? styles.selectedBtn : styles.sortBtn}
              >
                {btn[0]}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
