import axios from './instance'

const signup = async ({ displayName, email, password }) => {
  try {
    await axios.post('/members', { displayName, email, password })
    return 'success'
  } catch (error) {
    console.log(error)
    return error.response.status === 409 ? '409-fail' : 'fail'
  }
}

export default signup
