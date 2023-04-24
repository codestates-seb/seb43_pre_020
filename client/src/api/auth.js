import { saveRefreshTokenToLocalStorage } from '../utils/refreshTokenHandler'
import axios from './instance'

export const signup = async ({ displayName, email, password }) => {
  try {
    await axios.post('/members', { displayName, email, password })
    return 'success'
  } catch (error) {
    console.log(error)
    return error.response.status === 409 ? '409-fail' : 'fail'
  }
}

export const login = async ({ username, password, autoLogin = true }) => {
  try {
    const { headers } = await axios.post('/auth/login', { username, password, autoLogin })
    axios.defaults.headers.common.Authorization = `${headers.get('authorization')}`
    saveRefreshTokenToLocalStorage(headers.get('refresh'))
    return 'success'
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}
