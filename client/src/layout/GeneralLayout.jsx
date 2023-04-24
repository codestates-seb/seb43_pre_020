import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Aside from './Aside'
import styles from './GeneralLayout.module.scss'
import { getCurrentUserInfo, refreshAccessToken } from '../api/user'
import { getRefreshTokenFromLocalStorage } from '../utils/refreshTokenHandler'
import { LOGIN } from '../store/authSlice'

export default function GeneralLayout({ children }) {
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  const { pathname } = window.location

  const dispatch = useDispatch()

  const authHandler = async () => {
    console.log('사용자 인증 시작')
    const userInfoRes = await getCurrentUserInfo()

    if (userInfoRes) {
      console.log('has accessToken, 로그인 성공!!')
      // 리덕스 스토어에 사용자 인증 정보 저장(로그인 상태, 유저 정보)
      return
    }

    console.log('unvalid accessToken, 로그인 실패!!')

    // 리프레시 토큰이 없는 경우 => 비로그인 상태
    if (!getRefreshTokenFromLocalStorage()) {
      // 페이지가 auth가 필요한 페이지면 로그인 페이지로 이동
      console.log('no refreshToken, 비로그인 상태!!')
      return
    }

    // 리프레시 토큰이 있는 경우 => 엑세스토큰 발급 후 다시 로그인 시도
    const refreshRes = await refreshAccessToken()
    if (refreshRes === 'success') {
      // 새로 받은 엑세스 토큰으로 다시 authHandler() 실행
      console.log('refresh accesstoken success')
      const userInfoRes = await getCurrentUserInfo()
      if (userInfoRes) {
        console.log('get accessToken, 로그인 성공!!')
        dispatch(LOGIN(userInfoRes))
        return
      }
      console.log('refresh accesstoken success but login fail, 비로그인 상태')
    }
    console.log('refresh accesstoken fail, 비로그인 상태')
  }

  useEffect(() => {
    authHandler().then(() => {
      setIsAuthChecking(false)
    })

    // TODO
    // 1. 로그인 상태 x => 로그인이 필요한 페이지면 로그인 페이지로 이동 /mypage, /ask
    // 2. 로그인 상태 o => 로그인상태로 접근 x 페이지면 흠으로 이동 /login, /signup
  }, [pathname])

  const layoutMap = {
    '/login': <SignLayout content={children} />,
    '/signup': <SignLayout content={children} />,
    '/ask': <AskLayout content={children} />,
    '/mypage': <UserLayout content={children} />,
    default: <AllIncludedLayout content={children} isAuthChecking={isAuthChecking} />,
  }

  return layoutMap[pathname] || layoutMap.default
}

function SignLayout({ content }) {
  return (
    <>
      <Header />
      <div className={styles.signContainer}>{content}</div>
    </>
  )
}

function AskLayout({ content }) {
  return (
    <>
      <Header />
      <div className={styles.askContainer}>{content}</div>
      <Footer />
    </>
  )
}

function UserLayout({ content }) {
  return (
    <>
      <Header />
      <div className={styles.userContainer}>
        <Nav />
        {content}
      </div>
      <Footer />
    </>
  )
}

function AllIncludedLayout({ content, isAuthChecking }) {
  return (
    <>
      <Header isAuthChecking={isAuthChecking} />
      <div className={styles.container}>
        <Nav />
        <div className={styles.content}>
          {content}
          <Aside />
        </div>
      </div>
      <Footer />
    </>
  )
}
