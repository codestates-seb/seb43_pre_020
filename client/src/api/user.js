import axios from './instance'

const signup = async ({ displayName, email, password }) => {
  try {
    const response = await axios.post('/members', { displayName, email, password })
    console.log(response)
    return 'success'
  } catch (error) {
    if (error.response.status === 409) {
      return '409-fail'
    }
    console.log(error)
    return 'fail'
  }
}

export default signup
