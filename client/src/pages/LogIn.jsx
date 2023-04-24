import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useRouter from '../hooks/useRouter'
import styles from './LogIn.module.scss'
import { login, getCurrentUserInfo } from '../api/auth'
import { LOGIN } from '../store/authSlice'

function LogIn() {
  const { routeTo } = useRouter()
  const dispatch = useDispatch()

  const logInSubmitHandler = async event => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const username = formData.get('email')
    const password = formData.get('password')

    const loginRes = await login({ username, password })

    if (loginRes === 'success') {
      const userInfoRes = await getCurrentUserInfo()
      dispatch(LOGIN(userInfoRes))
      routeTo('/')
      return
    }
    alert('Sorry, you failed to log in.')
  }

  return (
    <div className={styles.container}>
      <a href='/'>
        <img
          className={styles.logoImg}
          src={`${process.env.PUBLIC_URL}/assets/logo-only-graphic.svg`}
          alt='stackoverflow logo img'
        />
      </a>
      <div className={styles.Oauths}>
        <button className={styles.googleBtn} type='button'>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/google.svg`} alt='google logo img' />
          Log in with Google
        </button>
        <button className={styles.githubBtn} type='button'>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/github.svg`} alt='github logo img' />
          Log in with GitHub
        </button>
      </div>
      <form className={styles.form} onSubmit={logInSubmitHandler}>
        <label className={styles.label}>
          Email
          <input className={styles.input} type='email' name='email' required />
        </label>
        <label className={styles.label}>
          Password
          <input className={styles.input} type='password' name='password' required />
        </label>
        <button className={styles.LoginBtn} type='submit'>
          Log in
        </button>
      </form>
      <span>
        Don’t have an account?<Link to='/signup'>Sign up</Link>
      </span>
    </div>
  )
}

export default LogIn
