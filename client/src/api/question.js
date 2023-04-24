import axios from './instance'

export async function getQuestions({ page, size }) {
  const query = `page=${page}&size=${size}`
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

export async function postComment({ id, body, memberId }) {
  try {
    const data = {
      body,
      memberId,
    }
    await axios.post(`/questions/${id}/comments`, data)
    return 'success'
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export async function postAnswer({ id, body, memberId }) {
  try {
    const data = {
      body,
      memberId,
    }
    await axios.post(`/questions/${id}/answers`, data)
    return 'success'
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}
