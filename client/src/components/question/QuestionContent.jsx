import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MDEditor from '@uiw/react-md-editor'
import useRouter from '../../hooks/useRouter'
import styles from '../../pages/Question.module.scss'
import { patchQuestion, deleteQuestion } from '../../api/question'
import QuestionComments from './QuestionComments'
import QuestionVotes from './QuestionVotes'
import ContentController from './ContentController'
import Writer from './Writer'

export default function QuestionContent({
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
