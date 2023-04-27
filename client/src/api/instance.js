import axios from 'axios'

const request = axios.create({
  baseURL: `${process.env.REACT_APP_API_END_POINT}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default request

export const fileAxios = axios.create({
  baseURL: `${process.env.REACT_APP_API_END_POINT}`,
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
