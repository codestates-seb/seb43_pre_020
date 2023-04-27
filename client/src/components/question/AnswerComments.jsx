import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../pages/Question.module.scss'
import { postAnswerComment } from '../../api/question'
import AnswerComment from './AnswerComment'
import CommentForm from './CommentForm'

export default function AnswerComments({ questionId, answerId, comments }) {
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
