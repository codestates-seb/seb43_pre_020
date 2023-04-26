/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import axios from '../api/instance'
import { removeRefreshTokenFromLocalStorage } from '../utils/refreshTokenHandler'

const authSlice = createSlice({
  name: 'AUTH',
  initialState: {
    isLogin: false,
    userInfo: null,
  },
  reducers: {
    LOGIN: (state, action) => {
      state.isLogin = true
      state.userInfo = action.payload
    },
    LOGOUT: state => {
      axios.defaults.headers.common.Authorization = ''
      removeRefreshTokenFromLocalStorage()
      state.isLogin = false
      state.userInfo = null
    },
  },
})

export default authSlice
export const { LOGIN, LOGOUT } = authSlice.actions
