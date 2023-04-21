import axios from './instance'

const getQuestions = async ({ page, size }) => {
  const query = `page=${page}&size=${size}`
  try {
    const { data } = await axios.get(`/questions?${query}`)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export default getQuestions
