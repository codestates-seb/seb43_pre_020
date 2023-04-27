import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import styles from '../../pages/Question.module.scss'
import { voteAnswer, adoptAnswer } from '../../api/question'

export default function AnswerVotes({ questionId, answerId, votes, answerStatus }) {
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
