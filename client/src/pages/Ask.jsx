import { useState } from 'react'
import styles from './Ask.module.scss'
import AskForm from '../component/AskForm'
import Preview from '../component/Preview'

export default function Ask() {
  const [data, setData] = useState({
    title: '',
    content: '',
  })

  const [writeDone, setWriteDone] = useState(false)

  const onChange = event => {
    if (event.target) {
      setData(prev => {
        return { ...prev, title: event.target.value }
      })
    } else {
      setData(prev => {
        return { ...prev, content: event }
      })
    }
  }

  return (
    <div className={styles.ask}>
      <h2 className={styles.headline}>Ask a public question</h2>
      {writeDone ? (
        <Preview data={data} writeDone={writeDone} setWriteDone={setWriteDone} />
      ) : (
        <AskForm
          data={data}
          onChange={onChange}
          writeDone={writeDone}
          setWriteDone={setWriteDone}
        />
      )}
    </div>
  )
}
