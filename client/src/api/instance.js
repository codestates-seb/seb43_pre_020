import axios from 'axios'

const request = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
})

export default request
