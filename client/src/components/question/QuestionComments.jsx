import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { postComment } from '../../api/question'
import styles from '../../pages/Question.module.scss'
import QuestionComment from './QuestionComment'
import CommentForm from './CommentForm'

export default function QuestionComments({ questionId, comments }) {
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
