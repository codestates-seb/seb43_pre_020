import React, { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MDEditor from '@uiw/react-md-editor'
import useRouter from '../hooks/useRouter'
import { getDetails, postComment, postAnswerComment } from '../api/question'
import styles from './Question.module.scss'
import calDate from '../utils/calDate'
// import AnswerForm from '../components/AnswerForm'

function Question() {
  const { id } = useParams()
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const [data, setData] = useState({})
  const [send, setSend] = useState(0)

  console.log(data.questionId)
  console.log(data.memberId)

  const handleUpClick = () => {
    if (!isLogin) {
      alert('로그인필요!')
      return
    }
    console.log('좋아요up')
  }

  const handleDownClick = () => {
    if (!isLogin) {
      alert('로그인필요!')
      return
    }
    console.log('좋아요down')
  }

  const handleEditClick = () => {
    if (!isLogin) {
      alert('로그인필요!')
      return
    }
    console.log('EditClick')
  }

  const handleDeleteClick = () => {
    if (!isLogin) {
      alert('로그인필요!')
      return
    }
    console.log('DeleteClick')
  }

  const handleSubmitComment = () => {
    if (!isLogin) {
      alert('로그인필요!')
      return
    }
    console.log('댓글등록')
  }

  useEffect(() => {
    async function fetchData() {
      const details = await getDetails(id)
      setData(details)
    }
    fetchData()
  }, [send])

  return (
    <div className={styles.container}>
      <QuestionTitle title={data.title} date={data.date} view={data.view} />
      <div className={styles.content}>
        <Votes
          status={null}
          votes={data.votes}
          upHandler={handleUpClick}
          downHandler={handleDownClick}
        />
        <div className={styles.paragraph} data-color-mode='light'>
          <MDEditor.Markdown source={data.content} />
          <div className={styles.contentDown}>
            <ContentController
              writerId={data.memberId}
              editHandler={handleEditClick}
              deleteHandler={handleDeleteClick}
            />
            <Writer
              type='question'
              date={data.date}
              writer={data.questioner}
              writerId={data.memberId}
            />
          </div>
          <CommentList comments={data.comments} />
          <CommentForm submitHandler={handleSubmitComment} />
        </div>
      </div>
      {data.answers?.length ? <Answers data={data.answers} /> : null}
      {/* <AnswerForm id={id} memberId={userInfo.memberId} send={send} setSend={setSend} /> */}
    </div>
  )
}

function Answers({ data }) {
  return (
    <div className={styles.answer}>
      <h1>{data.length} Answers</h1>
      {data.map(({ answerId, answerStatus, votes, answerer, body, comments, date, memberId }) => (
        <div className={styles.content} key={answerId}>
          <Votes
            status={answerStatus}
            votes={votes}
            upHandler={() => console.log('좋아요up')}
            downHandler={() => console.log('좋아요down')}
          />
          <div className={styles.paragraph} data-color-mode='light'>
            <MDEditor.Markdown source={body} />
            <div className={styles.contentDown}>
              <ContentController
                writerId={memberId}
                editHandler={() => console.log('click edit')}
                deleteHandler={() => console.log('click delete')}
              />
              <Writer type='answer' date={date} writer={answerer} />
            </div>
            <CommentList comments={comments} />
            <CommentForm submitHandler={() => console.log('댓글등록')} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ContentController({ writerId, editHandler, deleteHandler }) {
  const { userInfo } = useSelector(state => state.auth)
  const isShow = userInfo?.memberId === writerId
  return (
    isShow && (
      <div className={styles.edit}>
        <button type='button' onClick={editHandler}>
          Edit
        </button>{' '}
        <button type='button' onClick={deleteHandler}>
          Delete
        </button>
      </div>
    )
  )
}

function Writer({ type, date, writer, writerId }) {
  const label = type === 'question' ? 'Asked' : 'Answered'

  return (
    <div className={styles.writer}>
      <div className={styles.date}>
        {label} {calDate(date)}
      </div>
      <div className={styles.questioner}>
        <Link to={`/members/${writerId}`}>{writer}</Link>
      </div>
    </div>
  )
}

function Votes({ status, votes, upHandler, downHandler }) {
  return (
    <div className={styles.likes}>
      <button type='button' onClick={upHandler}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-gray.svg`}
          alt='likes up button'
        />
      </button>
      <span>{votes}</span>
      <button type='button' onClick={downHandler}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons/arrow-down-gray.svg`}
          alt='likes down button'
        />
      </button>
      {status === 'ANSWER_ADOPTED' && (
        <img
          className={styles.checked}
          src={`${process.env.PUBLIC_URL}/assets/icons/check-green.svg`}
          alt='adopted answer'
        />
      )}
    </div>
  )
}

function QuestionTitle({ title, date, view }) {
  const { isLogin } = useSelector(state => state.auth)
  const { routeTo } = useRouter()

  const handleClick = () => {
    if (!isLogin) {
      alert('로그인필요!')
    } else {
      routeTo('/ask')
    }
  }

  return (
    <div className={styles.title}>
      <div>
        <h1>{title}</h1>
        <button className={styles.btn} type='button' onClick={handleClick}>
          Ask Question
        </button>
      </div>
      <div className={styles.underTitle}>
        Asked <span>{calDate(date)}</span>
        Viewes <span>{view}</span>
      </div>
    </div>
  )
}

function CommentList({ comments }) {
  return (
    <div className={styles.comment}>
      {comments?.map(({ commentId, body, commenter, date }) => (
        <div className={styles.body} key={commentId}>
          <p>{body} -</p>
          <span className={styles.commenter}> {commenter}</span>
          <span className={styles.date}> {calDate(date)}</span>
        </div>
      ))}
    </div>
  )
}

function CommentForm({ submitHandler }) {
  const formRef = useRef(null)

  const handleSubmit = event => {
    event.preventDefault()

    const formdata = new FormData(event.currentTarget)
    const comment = formdata.get('comment')
    submitHandler(comment)
    formRef.current.reset()
  }

  return (
    <form ref={formRef} className={styles.addComment} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor='comment'>
        Add comment
      </label>
      <textarea className={styles.input} id='comment' name='comment' required />
      <button className={styles.btn} type='submit'>
        Submit
      </button>
    </form>
  )
}

// function AddComment({ id, memberId, setSend, answerId }) {
//   const [body, setBody] = useState('')
//   const handleCommentChange = e => {
//     setBody(e.target.value)
//   }
//   const handleSubmit = e => {
//     e.preventDefault()
//     if (answerId === undefined) {
//       postComment({ id, body, memberId }).then(res => {
//         if (res === 'success') {
//           setSend(prev => prev + 1)
//           setBody('')
//         }
//       })
//     } else {
//       postAnswerComment({ id, body, memberId, answerId }).then(res => {
//         if (res === 'success') {
//           setSend(prev => prev + 1)
//           setBody('')
//         }
//       })
//     }
//   }
//   return (
//     <form className={styles.addComment} onSubmit={handleSubmit}>
//       <label className={styles.label} htmlFor='comment'>
//         Add comment
//       </label>
//       <textarea
//         className={styles.input}
//         id='comment'
//         name='comment'
//         value={body}
//         onChange={handleCommentChange}
//         required
//       />
//       <button className={styles.btn} type='submit'>
//         Submit
//       </button>
//     </form>
//   )
// }

export default Question
