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

export const fileAxiso = axios.create({
  // baseURL: '',
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': '69420',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoidGVzdEB0ZXN0Iiwic3ViIjoiMSIsImlhdCI6MTY4MjQwNTYzOCwiZXhwIjoxNjgyNDA5MjM4fQ.CgEZdqnWGs8FvoQqkS72_q4OfqDmT272CjvGQCg4zEw',
  },
})
