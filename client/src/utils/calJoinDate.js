export default function calJoinDate(date) {
  const aDay = 1000 * 60 * 60 * 24
  const aWeek = 1000 * 60 * 60 * 24 * 7
  const aMonth = 1000 * 60 * 60 * 24 * 30.5
  const anYear = 1000 * 60 * 60 * 24 * 365

  const joined = new Date(date)
  const difference = new Date() - joined

  if (difference < aDay) {
    return 'since today'
  }
  if (difference < aWeek) {
    const day = parseInt(difference / aDay, 10)
    return `for ${day}일`
  }
  if (difference < aMonth) {
    const week = parseInt(difference / aWeek, 10)
    const remainingDays = difference % aWeek
    const day = parseInt(remainingDays / aDay, 10)
    return `for ${week}주 ${day ? `${day}일` : ''}`
  }
  if (difference < anYear) {
    const month = parseInt(difference / aMonth, 10)
    const remainingWeeks = difference % aMonth
    const week = parseInt(remainingWeeks / aWeek, 10)
    return `for ${month}개월 ${week ? `${week}주` : ''}`
  }
  const year = parseInt(difference / anYear, 10)
  const remainingMonths = difference % anYear
  const month = parseInt(remainingMonths / aMonth, 10)
  return `for ${year}년 ${month ? `${month}개월` : ''}`
}
