import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import store from './store'
import './styles/global.scss'

export default function App() {
  if (process.env.NODE_ENV === 'production') {
    console.log = function noConsole() {}
    console.warn = function noConsole() {}
  }

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
