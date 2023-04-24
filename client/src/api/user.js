import axios from './instance'

const signin = async ({ displayName, email, password }) => {
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

export default signin

export const getMemberDate = async memberId => {
  try {
    const { data } = await axios.get(`/members/${memberId}`)
    return data
  } catch (error) {
    console.log(error.message)
    throw new Error()
  }
}
