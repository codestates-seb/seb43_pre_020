/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MDEditor from '@uiw/react-md-editor'
import useRouter from '../hooks/useRouter'
import {
  getDetails,
  deleteQuestion,
  patchQuestion,
  deleteComment,
  patchComment,
  postComment,
  adoptAnswer,
  voteQuestion,
  voteAnswer,
  deleteAnswer,
  postAnswerComment,
  deleteAnswerComment,
  patchAnswerComment,
  patchAnswer,
} from '../api/question'
import styles from './Question.module.scss'
import calDate from '../utils/calDate'
import AnswerForm from '../components/AnswerForm'

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

function QuestionContent({
  questionId,
  memberId,
  questionStatus,
  content,
  votes,
  date,
  questioner,
  imageFileName,
  comments,
  title,
}) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const { routeTo } = useRouter()
  const [isEditMode, setIsEditMode] = useState(false)
  const [contentValue, setContentValue] = useState(content)
  const [editingContentValue, setEditingContentValue] = useState(contentValue)

  const handleEditClick = () => {
    setIsEditMode(true)
    setEditingContentValue(contentValue)
  }

  const handleChange = event => {
    setEditingContentValue(event)
  }

  const handleEditCancel = () => {
    setEditingContentValue(contentValue)
    setIsEditMode(false)
  }

  const handleEditSubmit = async () => {
    const body = { title, content: editingContentValue }
    const response = await patchQuestion(questionId, body)
    if (response === 'fail') {
      alert('질문 수정에 실패했습니다.')
      return
    }
    setContentValue(editingContentValue)
    setIsEditMode(false)
  }

  const handleDeleteClick = async () => {
    const res = await deleteQuestion(questionId)
    if (res === 'success') {
      routeTo('/')
    } else {
      alert('Delete Failed')
    }
  }

  useEffect(() => {
    setContentValue(content)
    // setEditingContentValue(contentValue)
  }, [content])

  return (
    <div className={styles.content}>
      <QuestionVotes questionId={questionId} questionStatus={questionStatus} votes={votes} />
      <div className={styles.paragraph} data-color-mode='light'>
        {isEditMode ? (
          <>
            <MDEditor value={editingContentValue} onChange={handleChange} preview='edit' required />
            <div className={styles.editBtnWrap}>
              <button type='submit' className={styles.editBtn} onClick={handleEditSubmit}>
                Edit your Question
              </button>
              <button type='button' className={styles.editCancelBtn} onClick={handleEditCancel}>
                Edit Cancel
              </button>
            </div>
          </>
        ) : (
          <MDEditor.Markdown source={contentValue} />
        )}
        <div className={styles.contentDown}>
          {isLogin && userInfo.memberId === memberId && !isEditMode && (
            <ContentController editHandler={handleEditClick} deleteHandler={handleDeleteClick} />
          )}
          <Writer
            type='question'
            date={date}
            writer={questioner}
            writerId={memberId}
            writerImg={imageFileName}
          />
        </div>
        <QuestionComments questionId={questionId} comments={comments} />
      </div>
    </div>
  )
}

function QuestionComments({ questionId, comments }) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const [commentsData, setCommentsData] = useState(comments)

  const handleCommentSubmit = async comment => {
    if (!isLogin) {
      alert('Please login first.')
      return
    }
    const res = await postComment(questionId, comment, userInfo.memberId)
    if (res === 'fail') {
      alert('Comment Post Failed')
      return
    }
    setCommentsData([...commentsData, res])
  }

  useEffect(() => {
    setCommentsData(comments)
  }, [comments])

  return (
    <div className={styles.comment}>
      {commentsData?.map(commentData => (
        <QuestionComment
          key={commentData.commentId}
          questionId={questionId}
          commentsData={commentsData}
          setCommentsData={setCommentsData}
          {...commentData}
        />
      ))}
      <CommentForm submitHandler={handleCommentSubmit} />
    </div>
  )
}

function QuestionComment({
  questionId,
  commentsData,
  setCommentsData,
  commentId,
  body,
  memberId,
  commenter,
  date,
  imageFileName,
}) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const [isEditmode, setIsEditmode] = useState(false)
  const [content, setContent] = useState(body)
  const [editingContent, setEditingContent] = useState(content)
  const [finalDate, setFinalDate] = useState(date)

  const handleChange = ({ target }) => setEditingContent(target.value)

  const handleEditClick = () => setIsEditmode(true)

  const handleCancelClick = () => {
    setIsEditmode(false)
    setEditingContent(content)
  }

  const handleDeleteClick = async () => {
    const response = await deleteComment(questionId, commentId)
    if (response === 'fail') {
      alert('Comment Delete Failed')
      return
    }
    setCommentsData(commentsData.filter(comment => comment.commentId !== commentId))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const res = await patchComment(questionId, editingContent, commentId)
    if (res === 'fail') {
      alert('Comment Edit Failed')
      return
    }
    setContent(res.body)
    setFinalDate(res.date)
    setIsEditmode(false)
  }

  return (
    <div className={styles.body} key={commentId}>
      {isEditmode ? (
        <form className={styles.addComment} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor='comment'>
            Edit comment
          </label>
          <textarea
            className={styles.input}
            id='comment'
            name='comment'
            value={editingContent}
            onChange={handleChange}
            required
          />
          <div className={styles.editBtns}>
            <button className={styles.cancleText} type='button' onClick={handleCancelClick}>
              Cancel
            </button>
            <button className={styles.submitText} type='submit'>
              Submit
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>{content} -</p>
          {imageFileName ? (
            <img
              className={styles.miniProfileImg}
              src={`${process.env.REACT_APP_IMAGE_URL}${imageFileName}`}
              alt='commenter'
            />
          ) : (
            <img
              className={styles.miniProfileImg}
              src={`${process.env.PUBLIC_URL}/assets/profile.png`}
              alt='default img'
            />
          )}
          <span className={styles.commenter}>
            <Link to={`/members/${memberId}`}>{commenter}</Link>
          </span>
          <span className={styles.date}> {calDate(finalDate)}</span>
          {isLogin && userInfo.memberId === memberId && (
            <>
              <button type='button' onClick={handleEditClick}>
                <img
                  className={styles.editIcon}
                  src={`${process.env.PUBLIC_URL}/assets/icons/pen.svg`}
                  alt='edit'
                />
              </button>
              <button type='button' onClick={handleDeleteClick}>
                <img
                  className={styles.deleteIcon}
                  src={`${process.env.PUBLIC_URL}/assets/icons/trash.svg`}
                  alt='delete'
                />
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}

function QuestionVotes({ questionId, votes }) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const [voteCount, setVoteCount] = useState(votes)
  const [voteStatus, setVoteStatus] = useState('NONE')

  const getVoteStatus = () => {
    if (!userInfo) return 'NONE'
    const voteInfo = userInfo.questionVotes.find(vote => vote.questionId === questionId)
    if (!voteInfo) return 'NONE'
    return voteInfo.voteStatus
  }

  useEffect(() => {
    setVoteCount(votes)
    setVoteStatus(getVoteStatus())
  }, [votes])

  const handleUpClick = async () => {
    if (!isLogin) {
      alert('Please login first.')
      return
    }
    const nextStatus = voteStatus === 'UPVOTE' ? 'NONE' : 'UPVOTE'
    const res = await voteQuestion(nextStatus, questionId, userInfo.memberId)
    if (res.status === 'success') {
      setVoteStatus(nextStatus)
      setVoteCount(res.votes)
    } else {
      alert('Voting Failed')
    }
  }

  const handleDownClick = async () => {
    if (!isLogin) {
      alert('Please login first.')
      return
    }
    const nextStatus = voteStatus === 'DOWNVOTE' ? 'NONE' : 'DOWNVOTE'
    const res = await voteQuestion(nextStatus, questionId, userInfo.memberId)
    if (res.status === 'success') {
      setVoteStatus(nextStatus)
      setVoteCount(res.votes)
    } else {
      alert(`${'DOWNVOTE'} :  Voting Failed`)
    }
  }

  return (
    <div className={styles.likes}>
      <button type='button' onClick={handleUpClick}>
        <img
          className={styles.likeBtn}
          src={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-${
            voteStatus === 'UPVOTE' ? 'green' : 'gray'
          }.svg`}
          alt='likes up button'
        />
      </button>

      <span>{voteCount}</span>

      <button type='button' onClick={handleDownClick}>
        <img
          className={styles.likeBtn}
          src={`${process.env.PUBLIC_URL}/assets/icons/arrow-down-${
            voteStatus === 'DOWNVOTE' ? 'green' : 'gray'
          }.svg`}
          alt='likes down button'
        />
      </button>
    </div>
  )
}

function Answer({
  questionId,
  answerId,
  body,
  memberId,
  answerer,
  answerStatus,
  date,
  comments,
  imageFileName,
  votes,
  refreshData,
}) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const [isEditMode, setIsEditMode] = useState(false)
  const [contentValue, setContentValue] = useState(body)
  const [editingContentValue, setEditingContentValue] = useState(contentValue)

  const handleEditClick = () => {
    setIsEditMode(true)
    setEditingContentValue(contentValue)
  }

  const handleChange = event => {
    setEditingContentValue(event)
  }

  const handleEditCancel = () => {
    setEditingContentValue(contentValue)
    setIsEditMode(false)
  }

  const handleEditSubmit = async () => {
    const body = { body: editingContentValue }
    const response = await patchAnswer(questionId, body, answerId)
    if (response === 'fail') {
      alert('질문 수정에 실패했습니다.')
      return
    }
    setContentValue(editingContentValue)
    setIsEditMode(false)
  }

  const handleDeleteClick = async () => {
    const res = await deleteAnswer(questionId, answerId)
    if (res === 'success') {
      refreshData()
    } else {
      alert('Delete Failed')
    }
  }

  return (
    <div className={styles.content} key={answerId}>
      <AnswerVotes
        questionId={questionId}
        answerId={answerId}
        memberId={memberId}
        votes={votes}
        answerStatus={answerStatus}
      />
      <div className={styles.paragraph} data-color-mode='light'>
        {isEditMode ? (
          <>
            <MDEditor value={editingContentValue} onChange={handleChange} preview='edit' required />
            <div className={styles.editBtnWrap}>
              <button type='submit' className={styles.editBtn} onClick={handleEditSubmit}>
                Edit your Answer
              </button>
              <button type='button' className={styles.editCancelBtn} onClick={handleEditCancel}>
                Edit Cancel
              </button>
            </div>
          </>
        ) : (
          <MDEditor.Markdown source={contentValue} />
        )}
        <div className={styles.contentDown}>
          {isLogin && userInfo.memberId === memberId && !isEditMode && (
            <ContentController editHandler={handleEditClick} deleteHandler={handleDeleteClick} />
          )}
          <Writer
            type='answer'
            date={date}
            writer={answerer}
            writerId={memberId}
            writerImg={imageFileName}
          />
        </div>
        <AnswerComments questionId={questionId} answerId={answerId} comments={comments} />
      </div>
    </div>
  )
}

function AnswerComments({ questionId, answerId, comments }) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const [commentsData, setCommentsData] = useState(comments)

  const handleCommentSubmit = async comment => {
    if (!isLogin) {
      alert('Please login first.')
      return
    }
    const res = await postAnswerComment(questionId, comment, userInfo.memberId, answerId)
    if (res === 'fail') {
      alert('Answer Comment Post Failed')
      return
    }
    setCommentsData([...commentsData, res])
  }

  useEffect(() => {
    setCommentsData(comments)
  }, [comments])

  return (
    <div className={styles.comment}>
      {commentsData?.map(commentData => (
        <AnswerComment
          key={commentData.commentId}
          questionId={questionId}
          answerId={answerId}
          commentsData={commentsData}
          setCommentsData={setCommentsData}
          {...commentData}
        />
      ))}
      <CommentForm submitHandler={handleCommentSubmit} />
    </div>
  )
}

function AnswerComment({
  questionId,
  answerId,
  commentsData,
  setCommentsData,
  body,
  commentId,
  commenter,
  date,
  imageFileName,
  memberId,
  // updatedAt,
}) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const [isEditmode, setIsEditmode] = useState(false)
  const [content, setContent] = useState(body)
  const [editingContent, setEditingContent] = useState(content)
  const [finalDate, setFinalDate] = useState(date)

  const handleChange = ({ target }) => setEditingContent(target.value)

  const handleEditClick = () => setIsEditmode(true)

  const handleCancelClick = () => {
    setIsEditmode(false)
    setEditingContent(content)
  }

  const handleDeleteClick = async () => {
    const response = await deleteAnswerComment(questionId, answerId, commentId)
    if (response === 'fail') {
      alert('Comment Delete Failed')
      return
    }
    setCommentsData(commentsData.filter(comment => comment.commentId !== commentId))
  }

  const handleEditSubmit = async event => {
    event.preventDefault()
    const res = await patchAnswerComment(questionId, answerId, commentId, editingContent)
    if (res === 'fail') {
      alert('Answer Comment Edit Failed')
      return
    }
    setContent(res.body)
    setFinalDate(res.date)
    setIsEditmode(false)
  }

  return (
    <div className={styles.body} key={commentId}>
      {isEditmode ? (
        <form className={styles.addComment} onSubmit={handleEditSubmit}>
          <label className={styles.label} htmlFor='comment'>
            Edit comment
          </label>
          <textarea
            className={styles.input}
            id='comment'
            name='comment'
            value={editingContent}
            onChange={handleChange}
            required
          />
          <div className={styles.editBtns}>
            <button className={styles.cancleText} type='button' onClick={handleCancelClick}>
              Cancel
            </button>
            <button className={styles.submitText} type='submit'>
              Submit
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>{content} -</p>
          {imageFileName ? (
            <img
              className={styles.miniProfileImg}
              src={`${process.env.REACT_APP_IMAGE_URL}${imageFileName}`}
              alt='commenter'
            />
          ) : (
            <img
              className={styles.miniProfileImg}
              src={`${process.env.PUBLIC_URL}/assets/profile.png`}
              alt='default img'
            />
          )}
          <span className={styles.commenter}>
            <Link to={`/members/${memberId}`}>{commenter}</Link>
          </span>
          <span className={styles.date}> {calDate(finalDate)}</span>
          {isLogin && userInfo.memberId === memberId && (
            <>
              <button type='button' onClick={handleEditClick}>
                <img
                  className={styles.editIcon}
                  src={`${process.env.PUBLIC_URL}/assets/icons/pen.svg`}
                  alt='edit'
                />
              </button>
              <button type='button' onClick={handleDeleteClick}>
                <img
                  className={styles.deleteIcon}
                  src={`${process.env.PUBLIC_URL}/assets/icons/trash.svg`}
                  alt='delete'
                />
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}

function AnswerVotes({ questionId, answerId, votes, answerStatus }) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const [voteCount, setVoteCount] = useState(votes)
  const [voteStatus, setVoteStatus] = useState('NONE')
  const [adoptStatus, setAdoptStatus] = useState(answerStatus)

  const getVoteStatus = () => {
    if (!userInfo) return 'NONE'
    const voteInfo = userInfo.answerVotes.find(vote => vote.answerId === answerId)
    if (!voteInfo) return 'NONE'
    return voteInfo.voteStatus
  }

  useEffect(() => {
    setVoteCount(votes)
    setVoteStatus(getVoteStatus())
    setAdoptStatus(answerStatus)
  }, [votes, answerStatus])

  const handleUpClick = async () => {
    if (!isLogin) {
      alert('Please login first.')
      return
    }
    const nextStatus = voteStatus === 'UPVOTE' ? 'NONE' : 'UPVOTE'
    const res = await voteAnswer(nextStatus, questionId, answerId, userInfo.memberId)
    if (res.status === 'success') {
      setVoteStatus(nextStatus)
      setVoteCount(res.votes)
    } else {
      alert('Voting Failed')
    }
  }

  const handleDownClick = async () => {
    if (!isLogin) {
      alert('Please login first.')
      return
    }
    const nextStatus = voteStatus === 'DOWNVOTE' ? 'NONE' : 'DOWNVOTE'
    const res = await voteAnswer(nextStatus, questionId, answerId, userInfo.memberId)
    if (res.status === 'success') {
      setVoteStatus(nextStatus)
      setVoteCount(res.votes)
    } else {
      alert(`${'DOWNVOTE'} :  Voting Failed`)
    }
  }

  const handleAdoptedClick = async () => {
    if (!isLogin) {
      alert('Please login first.')
      return
    }
    const res = await adoptAnswer(questionId, answerId)
    if (res === 'fail') {
      alert('Only questioners can adopt.')
      return
    }
    setAdoptStatus('ANSWER_ADOPTED')
  }

  return (
    <div className={styles.likes}>
      <button type='button' onClick={handleUpClick}>
        <img
          className={styles.likeBtn}
          src={`${process.env.PUBLIC_URL}/assets/icons/arrow-up-${
            voteStatus === 'UPVOTE' ? 'green' : 'gray'
          }.svg`}
          alt='likes up button'
        />
      </button>

      <span>{voteCount}</span>

      <button type='button' onClick={handleDownClick}>
        <img
          className={styles.likeBtn}
          src={`${process.env.PUBLIC_URL}/assets/icons/arrow-down-${
            voteStatus === 'DOWNVOTE' ? 'green' : 'gray'
          }.svg`}
          alt='likes down button'
        />
      </button>

      <button
        type='button'
        onClick={handleAdoptedClick}
        className={styles[`${adoptStatus}_BTN`]}
        disabled={adoptStatus === 'ANSWER_ADOPTED'}
      >
        <img
          className={styles.checked}
          src={`${process.env.PUBLIC_URL}/assets/icons/check-${
            adoptStatus === 'ANSWER_ADOPTED' ? 'green' : 'gray'
          }.svg`}
          alt='adopted answer'
        />
      </button>
    </div>
  )
}

function ContentController({ editHandler, deleteHandler }) {
  return (
    <div className={styles.edit}>
      <button type='button' onClick={editHandler}>
        Edit
      </button>{' '}
      <button type='button' onClick={deleteHandler}>
        Delete
      </button>
    </div>
  )
}

function Writer({ type, date, writer, writerId, writerImg }) {
  const label = type === 'question' ? 'Asked' : 'Answered'

  return (
    <div className={styles.writer}>
      {writerImg ? (
        <img
          className={styles.profileImg}
          src={`${process.env.REACT_APP_IMAGE_URL}${writerImg}`}
          alt='writer'
        />
      ) : (
        <img
          className={styles.profileImg}
          src={`${process.env.PUBLIC_URL}/assets/profile.png`}
          alt='default img'
        />
      )}
      <div className={styles.rightSide}>
        <div className={styles.date}>
          {label} {calDate(date)}
        </div>
        <div className={styles.questioner}>
          <Link to={`/members/${writerId}`}>{writer}</Link>
        </div>
      </div>
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
        <span>Asked {calDate(date)}</span>
        <span>Views {view}</span>
      </div>
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
