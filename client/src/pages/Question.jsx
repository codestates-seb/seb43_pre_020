import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDetails } from '../api/question'
import styles from './Question.module.scss'
import calDate from '../utils/calDate'

function Question() {
  const [data, setData] = useState({})
  const date = calDate(data.date)

  const { id } = useParams()

  useEffect(() => {
    async function fetchData() {
      const details = await getDetails(id)
      setData(details)
    }
    fetchData()
  }, [id])

  return (
    <div className={styles.container}>
      <Title data={data} date={date} />
      <div className={styles.content}>
        <div className={styles.likes}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-gray.svg`}
            alt='likes up button'
          />
          <span>{data.votes}</span>
          <img
            src={`${process.env.PUBLIC_URL}/assets/icons/arrow-down-gray.svg`}
            alt='likes down button'
          />
        </div>
        <div className={styles.paragraph}>
          {data.content}
          <div className={styles.contentDown}>
            <Edit />
            <div className={styles.writer}>
              <div className={styles.date}>Asked {date}</div>
              <div className={styles.questioner}>{data.questioner}</div>
            </div>
          </div>
          <Qcomment data={data} />
          <AddComment />
        </div>
      </div>
      <h1>Answer</h1>
      <Answer data={data} />
    </div>
  )
}

function Title({ data, date }) {
  return (
    <div className={styles.title}>
      <div>
        <h1>{data.title}</h1>
        <Link to='/ask' className={styles.btn}>
          Ask Question
        </Link>
      </div>
      <div className={styles.underTitle}>
        Asked <span>{date}</span>
      </div>
    </div>
  )
}

function Edit() {
  return (
    <div className={styles.edit}>
      <span>Edit</span>
      <span>Delete</span>
    </div>
  )
}

function Qcomment({ data }) {
  return (
    <div className={styles.comment}>
      {data.comments &&
        data.comments.map(comment => (
          <div className={styles.body} key={comment.commentId}>
            <p>{comment.body} -</p>
            <span className={styles.commenter}> {comment.commenter}</span>
            <span className={styles.date}> {calDate(comment.date)}</span>
          </div>
        ))}
    </div>
  )
}

function Acomment({ answer }) {
  return (
    <div className={styles.comment}>
      {answer.comments &&
        answer.comments.map(comment => (
          <div className={styles.body} key={comment.commentId}>
            <p>{comment.body} -</p>
            <span className={styles.commenter}> {comment.commenter}</span>
            <span className={styles.date}> {calDate(comment.date)}</span>
          </div>
        ))}
    </div>
  )
}

function AddComment() {
  return (
    <form className={styles.addComment}>
      <label className={styles.label} htmlFor='answer'>
        Add comment
      </label>
      <textarea className={styles.input} id='answer' name='answer' required />
      <button className={styles.btn} type='submit'>
        Submit
      </button>
    </form>
  )
}

function Answer({ data }) {
  return (
    <div className={styles.answer}>
      {data.answers &&
        data.answers.map(answer => (
          <div className={styles.content} key={answer.answerId}>
            <div className={styles.likes}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-gray.svg`}
                alt='likes up button'
              />
              <span>좋아요</span>
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/arrow-down-gray.svg`}
                alt='likes down button'
              />
              {answer.answerStatus === 'ANSWER_ADOPTED' ? (
                <img
                  className={styles.checked}
                  src={`${process.env.PUBLIC_URL}/assets/icons/check-green.svg`}
                  alt='adopted answer'
                />
              ) : null}
            </div>
            <div className={styles.paragraph}>
              <p>{answer.body}</p>
              <div className={styles.contentDown}>
                <Edit />
                <div className={styles.writer}>
                  <div className={styles.date}>Asked {calDate(answer.date)}</div>
                  <div className={styles.questioner}>{answer.answerer}</div>
                </div>
              </div>
              <Acomment answer={answer} />
              <AddComment />
            </div>
          </div>
        ))}
    </div>
  )
}

export default Question
