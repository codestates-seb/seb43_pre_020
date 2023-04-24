import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import store from './store'
import './styles/global.scss'

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
