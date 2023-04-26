export default function makePageBtn(totalElements, SIZE) {
  const needPage = Math.ceil(totalElements / SIZE)
  const newPageBtn = Array(needPage)
    .fill()
    .map((_, i) => i + 1)
  return newPageBtn
}
