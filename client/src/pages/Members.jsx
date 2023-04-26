import { useEffect, useState } from 'react'
import Member from './Member'
import styles from './Members.module.scss'
import { getAllMembersData } from '../api/user'
import makePageBtn from '../utils/pageBtn'

const SIZE = 6
function Members() {
  const [members, setMembers] = useState()
  const [offset, setOffset] = useState(1)
  const [pageBtn, setPageBtn] = useState([1])

  const handlePage = btn => {
    setOffset(btn)
  }

  useEffect(() => {
    getAllMembersData({ page: offset, size: SIZE }).then(({ data, pageInfo }) => {
      const newPageBtn = makePageBtn(pageInfo.totalElements, SIZE)
      setMembers(data)
      setPageBtn(newPageBtn)
    })
  }, [offset])

  return (
    <div className={styles.container}>
      <div>Users</div>
      <div className={styles.cardWrap}>
        {members?.map(member => {
          return (
            <div className={styles.card} key={member.memberId}>
              <Member id={member.memberId} />
            </div>
          )
        })}
      </div>
      <PageBtn pageBtn={pageBtn} offset={offset} handlePage={handlePage} />
    </div>
  )
}

export default Members

function PageBtn({ pageBtn, offset, handlePage }) {
  return pageBtn.map(btn => {
    return (
      <button
        key={btn}
        type='button'
        className={offset === btn ? styles.clickedBtn : styles.pageBtn}
        onClick={() => handlePage(btn)}
      >
        {btn}
      </button>
    )
  })
}
