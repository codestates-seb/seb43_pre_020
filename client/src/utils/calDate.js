function calDate(date) {
  const created = new Date(date)
  const difference = new Date() - created
  if (difference < 1000 * 60) {
    return 'now'
  }
  if (difference < 1000 * 60 * 60) {
    const minute = parseInt(difference / (1000 * 60), 10)
    return `${minute}분 전`
  }
  if (difference < 1000 * 60 * 60 * 24) {
    const hour = parseInt(difference / (1000 * 60 * 60), 10)
    return `${hour}시간 전`
  }
  if (difference < 1000 * 60 * 60 * 24 * 7) {
    const day = parseInt(difference / (1000 * 60 * 60 * 24), 10)
    return `${day}일 전`
  }
  if (difference < 1000 * 60 * 60 * 24 * 7 * 4) {
    const week = parseInt(difference / (1000 * 60 * 60 * 24 * 7), 10)
    return `${week}주 전`
  }
  if (difference < 1000 * 60 * 60 * 24 * 7 * 4 * 12) {
    const month = parseInt(difference / (1000 * 60 * 60 * 24 * 7 * 4), 10)
    return `${month}개월 전`
  }
  const year = created.getFullYear()
  const month = created.getMonth() + 1
  const dates = created.getDate()
  return `${year}년 ${month}월 ${dates}일`
}

export default calDate
