import { lazy } from 'react'

const Home = lazy(() => import('../pages/Home'))
const LogIn = lazy(() => import('../pages/LogIn'))
const SignUp = lazy(() => import('../pages/SignUp'))
const MyPage = lazy(() => import('../pages/MyPage'))
const Question = lazy(() => import('../pages/Question'))
const Ask = lazy(() => import('../pages/Ask'))
const Member = lazy(() => import('../pages/Member'))

export const routerData = [
  {
    id: 0,
    path: '/',
    element: <Home />,
    label: 'Questions',
    onNav: true,
  },
  {
    id: 1,
    path: '/questions/:id',
    element: <Question />,
    label: 'Question',
    onNav: false,
  },
  {
    id: 2,
    path: '/login',
    element: <LogIn />,
    label: 'Log in',
    onNav: false,
  },
  {
    id: 3,
    path: '/signup',
    element: <SignUp />,
    label: 'Sign up',
    onNav: false,
  },
  {
    id: 4,
    path: '/mypage',
    element: <MyPage />,
    label: 'My page',
    onNav: false,
  },
  {
    id: 5,
    path: '/members',
    element: <div>전체 유저 조회 페이지</div>,
    label: 'Users',
    onNav: true,
  },
  {
    id: 6,
    path: '/members/:memberId',
    element: <Member />,
    label: 'User',
    onNav: false,
  },
  {
    id: 7,
    path: '/ask',
    element: <Ask />,
    label: 'Ask',
    onNav: false,
  },
  {
    id: 8,
    path: '/tags',
    element: <div>Tags</div>,
    label: 'Tags',
    onNav: true,
  },
  {
    id: 9,
    path: '/companies',
    element: <div>Companies</div>,
    label: 'Companies',
    onNav: true,
  },
  {
    id: 10,
    path: '/*',
    element: <div>404 Not Found</div>,
    label: '404',
    onNav: false,
  },
]

export const navContent = routerData.reduce((prev, router) => {
  if (!router.onNav) return prev
  const { id, path, label } = router
  return [...prev, { id, path, label }]
}, [])
