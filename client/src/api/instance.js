import axios from 'axios'

const request = axios.create({
  // baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
})

export default request

export const fileAxios = axios.create({
  // baseURL: '',
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': '69420',
  },
})
