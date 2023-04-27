import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useRouter from '../hooks/useRouter'
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
  const { currentPath } = useRouter()
  const dispatch = useDispatch()

  const authHandler = async () => {
    const userInfoRes = await getCurrentUserInfo()
    if (userInfoRes) {
      console.log('has accessToken, 로그인 성공!!')
      dispatch(LOGIN(userInfoRes))
      return
    }

    if (!getRefreshTokenFromLocalStorage()) return

    const refreshRes = await refreshAccessToken()
    if (refreshRes === 'success') {
      const userInfoRes = await getCurrentUserInfo()
      userInfoRes && dispatch(LOGIN(userInfoRes))
    }
  }

  useEffect(() => {
    authHandler().then(() => setIsAuthChecking(false))
    // TODO
    // 1. 로그인 상태 x => 로그인이 필요한 페이지면 로그인 페이지로 이동 /mypage, /ask
    // 2. 로그인 상태 o => 로그인상태로 접근 x 페이지면 흠으로 이동 /login, /signup
  }, [currentPath])

  const getLayoutOptionName = currentPath => {
    const path = currentPath.split('/')[1]
    if (path === 'ask') return 'includeHeaderFooter'
    if (path === 'login' || path === 'signup') return 'includeHeader'
    if (path === 'mypage' || path === 'members' || path === 'tags' || path === 'companies')
      return 'includeHeaderFooterNav'
    return 'includeAll'
  }
  const layoutOption = {
    includeHeaderFooterNav: { header: true, footer: true, nav: true, aside: false },
    includeHeaderFooter: { header: true, footer: true, nav: false, aside: false },
    includeHeader: { header: true, footer: false, nav: false, aside: false },
    includeAll: { header: true, footer: true, nav: true, aside: true },
  }
  const layoutOptionName = getLayoutOptionName(currentPath)

  const { nav, aside, footer } = layoutOption[layoutOptionName]

  return (
    <>
      <Header isAuthChecking={isAuthChecking} />
      <div className={styles[`${layoutOptionName}Container`]}>
        {nav && <Nav />}
        <div className={styles[`${layoutOptionName}Content`]}>
          {children}
          {aside && <Aside />}
        </div>
      </div>
      {footer && <Footer />}
    </>
  )
}
