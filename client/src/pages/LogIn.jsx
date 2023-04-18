import styles from './login.module.scss'

function LogIn() {
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
      <form className={styles.form}>
        <label className={styles.label}>
          Email
          <input className={styles.input} type='email' />
        </label>
        <label className={styles.label}>
          Password
          <input className={styles.input} type='password' />
        </label>
        <button className={styles.LoginBtn} type='button'>
          Log in
        </button>
      </form>
      <span>
        Don’t have an account?<a href='/signup'>Sign up</a>
      </span>
    </div>
  )
}

export default LogIn
