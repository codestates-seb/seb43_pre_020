import { Outlet } from 'react-router-dom'
import './styles/global.scss'
import GeneralLayout from './layout/GeneralLayout'

export default function App() {
  return (
    <GeneralLayout>
      <Outlet />
    </GeneralLayout>
  )
}
