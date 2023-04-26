import { useNavigate } from 'react-router-dom'

const useRouter = () => {
  const router = useNavigate()

  return {
    currentPath: window.location.pathname,
    routeTo: path => router(path),
  }
}

export default useRouter
