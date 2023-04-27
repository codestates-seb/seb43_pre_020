import { useState } from 'react'
import { useSelector } from 'react-redux'
import MDEditor from '@uiw/react-md-editor'
import { patchAnswer, deleteAnswer } from '../../api/question'
import styles from '../../pages/Question.module.scss'
import AnswerComments from './AnswerComments'
import AnswerVotes from './AnswerVotes'
import ContentController from './ContentController'
import Writer from './Writer'

export default function Answer({
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
