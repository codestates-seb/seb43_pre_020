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
  const [totalQuestions, setTotalQuestions] = useState(0)

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
      await getQuestions({ page, size: SIZE }).then(({ data, pageInfo }) => {
        const newPageBtn = makePageBtn(pageInfo.totalElements)
        setTotalQuestions(pageInfo.totalElements)
        setData(data)
        setPageBtn(newPageBtn)
      })
    }
    makePage()
  }, [page])

  return (
    <div className={styles.homeContainer}>
      <HomeHeader
        length={totalQuestions}
        page={page}
        setTotalQuestions={setTotalQuestions}
        setData={setData}
      />
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

function HomeHeader({ length, page, setTotalQuestions, setData }) {
  const [queryName, setQueryName] = useState('questionId')
  let query = ''
  const handleClick = e => {
    switch (e.target.name) {
      case 'questionId':
        query = '&sortBy=questionId&direction=DESC'
        setQueryName(e.target.name)
        break
      case 'votes':
        query = '&sortBy=votes&direction=DESC'
        setQueryName(e.target.name)
        break
      case 'answered':
        query = '&answered=false'
        setQueryName(e.target.name)
        break
      default:
        query = ''
        setQueryName('questionId')
    }

    getQuestions({ page, size: SIZE }, query).then(({ data, pageInfo }) => {
      setTotalQuestions(pageInfo.totalElements)
      setData(data)
    })
  }

  const sortBtn = [
    ['Newest', 'questionId'],
    ['Votes', 'votes'],
    ['Unanswered', 'answered'],
  ]

  return (
    <>
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
                className={queryName === btn[1] ? styles.selectedBtn : styles.sortBtn}
              >
                {btn[0]}
              </button>
            )
          })}
        </div>
      </div>
    </div>
    </>
  )
}
