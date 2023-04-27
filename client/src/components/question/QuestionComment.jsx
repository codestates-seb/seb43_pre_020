import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../pages/Question.module.scss'
import { deleteComment, patchComment } from '../../api/question'
import calDate from '../../utils/calDate'

export default function QuestionComment({
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
