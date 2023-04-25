import axios from './instance'

export async function getQuestions({ page = 1, size = 5 }, sortQuery = '') {
  const query = `page=${page}&size=${size}${sortQuery}`
  try {
    console.log(query)
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
