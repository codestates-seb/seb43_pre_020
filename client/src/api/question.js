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

export async function deleteQuestion(questionId) {
  try {
    await axios.delete(`/questions/${questionId}`)
    return 'success'
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export async function postComment(id, body, memberId) {
  try {
    const data = {
      body,
      memberId,
    }
    const res = await axios.post(`/questions/${id}/comments`, data)
    return res.data
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export async function deleteComment(id, commentId) {
  try {
    // console.log('deleteComment의 id body commentId ', id, commentId)
    await axios.delete(`/questions/${id}/comments/${commentId}`)
    return 'success'
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export async function deleteAnswerComment(questionId, answerId, commentId) {
  try {
    await axios.delete(`/questions/${questionId}/answers/${answerId}/comments/${commentId}`)
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

export async function patchComment(id, body, commentId) {
  try {
    const { data } = await axios.patch(`/questions/${id}/comments/${commentId}`, { body })
    return data
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export async function patchAnswerComment(questionId, answerId, commentId, body) {
  try {
    const { data } = await axios.patch(
      `/questions/${questionId}/answers/${answerId}/comments/${commentId}`,
      { body }
    )
    return data
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export async function postAnswerComment(id, body, memberId, answerId) {
  try {
    const data = {
      body,
      memberId,
    }
    const res = await axios.post(`/questions/${id}/answers/${answerId}/comments`, data)
    return res.data
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export async function adoptAnswer(questionId, answerId) {
  try {
    const data = { answerId }
    await axios.post(`/questions/${questionId}`, data)
    return 'success'
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}

export async function voteQuestion(voteStatus, questionId, memberId) {
  try {
    const data = { memberId, voteStatus }
    const res = await axios.post(`/questions/${questionId}/votes`, data)
    return {
      status: 'success',
      votes: res.data,
    }
  } catch (error) {
    console.log(error)
    return {
      status: 'fail',
      votes: null,
    }
  }
}

export async function voteAnswer(voteStatus, questionId, answerId, memberId) {
  try {
    const data = { memberId, voteStatus }
    const res = await axios.post(`/questions/${questionId}/answers/${answerId}/votes`, data)
    return {
      status: 'success',
      votes: res.data,
    }
  } catch (error) {
    console.log(error)
    return {
      status: 'fail',
      votes: null,
    }
  }
}

export async function patchQuestion(questionId, body) {
  try {
    const { data } = await axios.patch(`/questions/${questionId}`, body)
    return data
  } catch (error) {
    console.log(error)
    return 'fail'
  }
}
