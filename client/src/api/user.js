import {
  saveRefreshTokenToLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
} from '../utils/refreshTokenHandler'
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

export const refreshAccessToken = async () => {
  try {
    const { headers } = await axios.get('/auth/refresh', {
      headers: {
        Refresh: getRefreshTokenFromLocalStorage(),
      },
    })
    axios.defaults.headers.common.Authorization = `${headers.get('authorization')}`
    return 'success'
  } catch (error) {
    removeRefreshTokenFromLocalStorage()
    return 'fail'
  }
}

export const getCurrentUserInfo = async () => {
  try {
    const userInfoRes = await axios.get('/profile')
    return userInfoRes.data
  } catch (error) {
    return null
  }
}

export const getMemberData = async memberId => {
  try {
    const { data } = await axios.get(`/members/${memberId}`)
    return data
  } catch (error) {
    throw new Error()
  }
}

export const changeUserInfo = async (memberId, body) => {
  try {
    const { data } = await axios.patch(`/members/${memberId}`, body)
    return data
  } catch (error) {
    return 'Fail'
  }
}
