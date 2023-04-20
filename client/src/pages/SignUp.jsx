import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './signup.module.scss'
import axios from '../api/instance'

function SignUp() {
  return (
    <div className={styles.entireContainer}>
      <Board />
      <div className={styles.container}>
        <Oauths />
        <Form />
        <span>
          Already have an account?<a href='/login'>Log in</a>
        </span>
      </div>
    </div>
  )
}

function Board() {
  return (
    <div className={styles.board}>
      <div className={styles.title}>Join the Stack Overflow community</div>
      <div className={styles.list}>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/community_1.svg`} alt='icon1' />
        Get unstuck — ask a question
      </div>
      <div className={styles.list}>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/community_2.svg`} alt='icon2' />
        Unlock new privileges like voting and commenting
      </div>
      <div className={styles.list}>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/community_3.svg`} alt='icon3' />
        Save your favorite questions, answers, watch tags, and <br />
        more
      </div>
      <div className={styles.list}>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/community_4.svg`} alt='icon4' />
        Earn reputation and badges
      </div>
      <p>
        Collaborate and share knowledge with a private group for FREE. <br />
        <a
          href='https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up'
          target='_blank'
          rel='noreferrer'
        >
          Get Stack Overflow for Teams free for up to 50 users.
        </a>
      </p>
    </div>
  )
}

function Oauths() {
  return (
    <div className={styles.oauths}>
      <button className={styles.googleBtn} type='button'>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/google.svg`} alt='google logo img' />
        Sign up with Google
      </button>
      <button className={styles.githubBtn} type='button'>
        <img src={`${process.env.PUBLIC_URL}/assets/icons/github.svg`} alt='github logo img' />
        Sign up with GitHub
      </button>
    </div>
  )
}

function Form() {
  const navigate = useNavigate()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('/members', { displayName, email, password })
      .then(response => {
        console.log(response)
        navigate(`/login`)
      })
      .catch(error => {
        if (error.response.status === 409) {
          alert('This email has already been registered.')
        } else {
          console.log(error)
          alert('Sorry, you failed to sign up.')
        }
      })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label}>
        Display name
        <input
          className={styles.input}
          type='text'
          name='displayName'
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          required
        />
      </label>
      <label className={styles.label}>
        Email
        <input
          className={styles.input}
          type='email'
          name='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <label className={styles.label}>
        Password
        <input
          className={styles.input}
          type='password'
          name='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          pattern='^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$'
          title='최소 8자, 문자와 숫자를 모두 포함해야 합니다.'
          required
        />
      </label>
      <p className={styles.notice}>
        Passwords must contain at least eight characters,
        <br /> including at least 1 letter and 1 number.
      </p>
      <button className={styles.signupBtn} type='submit'>
        Sign up
      </button>
      <p className={styles.notice}>
        By clicking “Sign up”, you agree to our{' '}
        <a
          href='https://stackoverflow.com/legal/terms-of-service/public'
          target='_blank'
          rel='noreferrer'
        >
          terms of <br />
          service
        </a>
        ,{' '}
        <a href='https://stackoverflow.com/legal/privacy-policy' target='_blank' rel='noreferrer'>
          privacy policy
        </a>{' '}
        and{' '}
        <a href='https://stackoverflow.com/legal/cookie-policy' target='_blank' rel='noreferrer'>
          cookie policy
        </a>
      </p>
    </form>
  )
}

export default SignUp
