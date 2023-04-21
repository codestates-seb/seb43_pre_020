import React, { useState, useEffect } from 'react'
import { getDetails } from '../api/question'
// import styles from './Question.module.scss'

function Question() {
  const [data, setData] = useState({})

  useEffect(() => {
    async function fetchData() {
      const details = await getDetails({ questionId: '1' })
      setData(details)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>{data.title}</h1>
      <span>views : {data.view}</span>
      <p>{data.content}</p>
      <span>
        {data.questioner} / {data.date}
      </span>
      {data.comments &&
        data.comments.map(comment => (
          <div key={comment.commentId}>
            <p>{comment.body}</p>
            <span>
              {comment.date} / {comment.commenter}
            </span>
          </div>
        ))}
      {data.answers &&
        data.answers.map(answer => (
          <div key={answer.answerId}>
            <p>{answer.body}</p>
            <span>
              {answer.date} / {answer.answerer}
            </span>
            <h3>Comments:</h3>
            {answer.comments &&
              answer.comments.map(comment => (
                <div key={comment.commentId}>
                  <p>{comment.body}</p>
                  <p>
                    Commented by {comment.commenter} on {comment.date}
                  </p>
                </div>
              ))}
          </div>
        ))}
    </div>
  )
}

export default Question
