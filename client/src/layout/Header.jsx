import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export default function Header() {
  // TODO: 사용자 정보 확인 후 로그인 여부 판단
  const [isLogin, setIsLogin] = useState(false)

  const handleLogOutBtnClick = () => {
    // TODO: 로그아웃 처리
    setIsLogin(false)
  }

  return (
    <>
      <HeaderContainer>
        <Logo path='/' src={`${process.env.PUBLIC_URL}/assets/logo.svg`} alt='stack overflow' />
        <SearchBar />
        <ButtonWrap>
          {isLogin ? (
            <>
              <LinkBtn path='/mypage' label='My page' onClick={setIsLogin} />
              <LogOutBtn label='Log out' onClick={handleLogOutBtnClick} />
            </>
          ) : (
            <>
              <LinkBtn path='/login' label='Log in' />
              <LinkBtn path='/signup' label='Sign up' />
            </>
          )}
        </ButtonWrap>
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

function SearchBar() {
  return (
    <form>
      <input type='text' required />
      <button type='submit'>검색</button>
    </form>
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

function LinkBtn({ path, label }) {
  const className = `${path.slice(1)}Btn`
  const children =
    path === '/mypage' ? (
      <img src={`${process.env.PUBLIC_URL}/assets/profile.png`} alt='user profile' />
    ) : (
      label
    )

  return (
    <Link className={styles[className]} to={path}>
      {children}
    </Link>
  )
}
