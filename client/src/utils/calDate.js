function calDate(date) {
  const aMinute = 1000 * 60
  const anHour = 1000 * 60 * 60
  const aDay = 1000 * 60 * 60 * 24
  const aWeek = 1000 * 60 * 60 * 24 * 7
  const aMonth = 1000 * 60 * 60 * 24 * 30.5
  const anYear = 1000 * 60 * 60 * 24 * 365

  const created = new Date(date)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000
  const difference = new Date() - created - KR_TIME_DIFF
  if (difference < aMinute) {
    return 'now'
  }
  if (difference < anHour) {
    const minute = parseInt(difference / aMinute, 10)
    return `${minute}분 전`
  }
  if (difference < aDay) {
    const hour = parseInt(difference / anHour, 10)
    return `${hour}시간 전`
  }
  if (difference < aWeek) {
    const day = parseInt(difference / aDay, 10)
    return `${day}일 전`
  }
  if (difference < aMonth) {
    const week = parseInt(difference / aWeek, 10)
    return `${week}주 전`
  }
  if (difference < anYear) {
    const month = parseInt(difference / aMonth, 10)
    return `${month}개월 전`
  }
  const year = created.getFullYear()
  const month = created.getMonth() + 1
  const dates = created.getDate()
  return `${year}년 ${month}월 ${dates}일`
}

export default calDate
