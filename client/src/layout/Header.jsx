import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Header.module.scss'
import { LOGOUT } from '../store/authSlice'

export default function Header({ isAuthChecking }) {
  const { isLogin, userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleLogOutBtnClick = () => {
    dispatch(LOGOUT())
  }

  const profileImg = userInfo.imageFileName
    ? `${process.env.REACT_APP_IMAGE_URL}${userInfo.imageFileName}`
    : `${process.env.PUBLIC_URL}/assets/profile.png`

  return (
    <>
      <HeaderContainer>
        <Logo path='/' src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='stack overflow' />
        {isAuthChecking ? (
          <ButtonWrap>Auth Checking...</ButtonWrap>
        ) : (
          <ButtonWrap>
            {isLogin ? (
              <>
                <LinkBtn path='/mypage' label={userInfo.displayName} profileImg={profileImg} />
                <LogOutBtn label='Log out' onClick={handleLogOutBtnClick} />
              </>
            ) : (
              <>
                <LinkBtn path='/login' label='Log in' />
                <LinkBtn path='/signup' label='Sign up' />
              </>
            )}
          </ButtonWrap>
        )}
      </HeaderContainer>
      <div className={styles.clearfix} />
    </>
  )
}

function HeaderContainer({ children }) {
  return (
    <header className={styles.outer}>
      <div className={styles.inner}>{children}</div>
    </header>
  )
}

function Logo({ path, src, alt }) {
  return (
    <div className={styles.logo}>
      <Link to={path}>
        <img src={src} alt={alt} />
      </Link>
    </div>
  )
}

function ButtonWrap({ children }) {
  return <div className={styles.btnWrap}>{children}</div>
}

function LogOutBtn({ label, onClick }) {
  return (
    <button type='button' className={styles.logOutBtn} onClick={onClick}>
      {label}
    </button>
  )
}

function LinkBtn({ path, label, profileImg }) {
  const className = `${path.slice(1)}Btn`
  const children =
    path === '/mypage' ? (
      <>
        <img src={profileImg} alt='user profile' />
        <span>{label}</span>
      </>
    ) : (
      label
    )

  return (
    <Link className={styles[className]} to={path}>
      {children}
    </Link>
  )
}
