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
