import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import LogIn from '../pages/LogIn'
import SignUp from '../pages/SignUp'
import MyPage from '../pages/MyPage'
import Question from '../pages/Question'
import Ask from '../pages/Ask'
import Members from '../pages/Members'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <LogIn /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/questions/:id', element: <Question /> },
      { path: '/ask', element: <Ask /> },
      { path: '/members/:memberId', element: <Members /> },
    ],
  },
])

export default router
