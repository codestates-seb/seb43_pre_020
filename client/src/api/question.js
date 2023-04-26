import axios from './instance'

export async function getQuestions({ page = 1, size = 5 }, sortQuery = '') {
  const query = `page=${page}&size=${size}${sortQuery}`
  try {
    const { data } = await axios.get(`/questions?${query}`)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export async function getDetails(id) {
  try {
    const { data } = await axios.get(`/questions/${id}`)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export async function postQuestion(body) {
  try {
    const response = await axios.post('/questions', body)
    return response
  } catch (error) {
    throw new Error()
    // if (error.response.data.message === 'Bad Request') {
    //   const { fieldErrors, violationErrors } = error.response.data
    //   console.log('fieldErrors 출력', fieldErrors || violationErrors)
    // } else {
    //   console.log('일반 에러 메세지', error.message)
    // }
  }
}
