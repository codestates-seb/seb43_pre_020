import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../pages/Question.module.scss'
import { voteQuestion } from '../../api/question'

export default function QuestionVotes({ questionId, votes }) {
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
