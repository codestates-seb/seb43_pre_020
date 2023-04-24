// import React, { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
// import { getDetails } from '../api/question'
import styles from './Question.module.scss'
import calDate from '../utils/calDate'

function Question() {
  // const [data, setData] = useState({})
  const data = {
    questionId: 1,
    title: 'Why is processing a sorted array faster than processing an unsorted array?',
    content:
      '솔직히, 말할게 많이 기다려 왔어 너도 그랬을 거라 믿어 오늘이 오길 매일같이 달력을 보면서 솔직히, 나에게도, 지금 이 순간은 꿈만 같아, 너와 함께라 오늘을 위해 꽤 많은 걸 준비해 봤어 All about you and I, 다른 건 다 제쳐 두고 Now come with me, take my hand 아름다운 청춘의 한 장 함께 써내려 가자 너와의 추억들로 가득 채울래 come on! 아무 걱정도 하지는 마, 나에게 다 맡겨 봐 지금 이 순간이 다시 넘겨볼 수 있는 한 페이지가 될 수 있게 Yah, yeah-oh, yah, yo-oh, this is our page Yah, yeah-oh, yah, yo-oh, our page 솔직히, 말할게 지금이 오기까지 마냥 순탄하진 않았지 오늘이 오길 나도 목 빠져라 기다렸어 솔직히, 나보다도 네가 몇 배는 더 힘들었을 거라고 믿어 오늘을 위해 그저 견뎌줘서 고마워 All about you and I, 다른 건 다 제쳐 두고 Now come with me, take my hand 아름다운 청춘의 한 장 함께 써내려 가자 너와의 추억들로 가득 채울래 come on! 아무 걱정도 하지는 마, 나에게 다 맡겨 봐 지금 이 순간이 다시 넘겨볼 수 있는 한 페이지가 될 수 있게 Want you to come on out and have fun Want us to have the time of our life 너와의 추억들로 가득 채울래 come on! 아무 걱정도 하지는 마, 나에게 다 맡겨 봐 지금 이 순간이 다시 넘겨볼 수 있는한 페이지가 될 수 있게',
    date: '2023-04-20T17:07:41.274965',
    memberId: 1,
    questioner: 'kim',
    view: 1,
    votes: 0,
    answers: [
      {
        answerId: 1,
        body: '답변이당',
        memberId: 1,
        answerer: 'Seo',
        date: '2023-04-19T17:07:44.614834',
        comments: [
          {
            commentId: 1,
            body: '답변의 댓글이당 댓글이이러러러러러러러러러러러러러러러럴러ㅓ러럴러러러러러러러러러럴게 길다아아아아아아아아아아아아앙',
            memberId: 1,
            commenter: 'Park',
            date: '2023-04-18T17:07:51.69199',
          },
          {
            commentId: 2,
            body: '답변의 댓글이당2',
            memberId: 1,
            commenter: 'kim',
            date: '2023-04-17T17:07:51.69199',
          },
        ],
      },
      {
        answerId: 2,
        body: '답변이당2',
        memberId: 1,
        answerer: 'kim',
        answerStatus: 'ANSWER_ADOPTED',
        date: '2023-04-20T17:07:44.614834',
        comments: [
          {
            commentId: 1,
            body: '답변의 댓글이당1',
            memberId: 1,
            commenter: 'kim',
            date: '2023-04-19T17:07:51.69199',
          },
        ],
      },
    ],
    comments: [
      {
        commentId: 1,
        body: '질문의 댓글이당',
        memberId: 1,
        commenter: 'kim',
        date: '2023-04-17T17:07:47.551306',
      },
      {
        commentId: 2,
        body: '질문의 댓글이당2',
        memberId: 1,
        commenter: 'kim',
        date: '2023-04-18T17:07:47.551306',
      },
      {
        commentId: 1,
        body: '질문의 댓글이당3',
        memberId: 1,
        commenter: 'kim',
        date: '2023-04-19T17:07:47.551306',
      },
    ],
  }
  const date = calDate(data.date)

  // const { id } = useParams()

  // useEffect(() => {
  //   async function fetchData() {
  //     const details = await getDetails(id)
  //     setData(details)
  //   }
  //   fetchData()
  // }, [id])

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
        Asked <span>{data.questioner}</span>
      </div>
      <div className={styles.underTitle}>
        viewed <span>{date}</span>
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
