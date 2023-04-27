import {
  saveRefreshTokenToLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
} from '../utils/refreshTokenHandler'
import axios, { fileAxios } from './instance'

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
    axios.defaults.headers.common.Authorization = `${headers.get('Authorization')}`
    fileAxios.defaults.headers.common.Authorization = `${headers.get('Authorization')}`
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
    axios.defaults.headers.common.Authorization = `${headers.get('Authorization')}`
    fileAxios.defaults.headers.common.Authorization = `${headers.get('Authorization')}`
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

export const changeUserInfo = async (memberId, formData) => {
  try {
    const data = await fileAxios.patch(`/members/${memberId}`, formData)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export const getAllMembersData = async ({ page = 1, size = 12 }) => {
  try {
    const { data } = await axios.get(`/members?page=${page}&size=${size}`)
    return data
  } catch (error) {
    return error
  }
}
