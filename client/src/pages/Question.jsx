import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDetails } from '../api/question'
import styles from './Question.module.scss'
import AnswerForm from '../components/question/AnswerForm'
import QuestionTitle from '../components/question/QuestionTitle'
import Answer from '../components/question/Answer'
import QuestionContent from '../components/question/QuestionContent'

export default function Question() {
  const { id } = useParams()
  const [data, setData] = useState({})

  const fetchData = () => {
    getDetails(id).then(res => {
      setData(res)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const questionData = {
    title: data.title,
    questionId: data.questionId,
    memberId: data.memberId,
    questionStatus: data.questionStatus,
    content: data.content,
    votes: data.votes,
    date: data.date,
    questioner: data.questioner,
    imageFileName: data.imageFileName,
    comments: data.comments,
  }

  return (
    <div className={styles.container}>
      <QuestionTitle title={data.title} date={data.date} view={data.view} />
      <QuestionContent {...questionData} />
      {data.answers?.length ? (
        <div className={styles.answer}>
          <h1>{data.answers.length} Answers</h1>
          {data.answers.map(answerData => (
            <Answer
              key={answerData.answerId}
              questionId={questionData.questionId}
              refreshData={fetchData}
              {...answerData}
            />
          ))}
        </div>
      ) : null}
      <AnswerForm id={id} fetchData={fetchData} />
    </div>
  )
}
