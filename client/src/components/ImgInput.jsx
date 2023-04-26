import { useEffect, useRef, useState } from 'react'
import styles from '../pages/MyPage.module.scss'

export default function ImgInput({ initial }) {
  const [preview, setPreview] = useState(initial)
  const [imageFile, setImageFile] = useState(null)
  const inputRef = useRef()

  const handleChange = e => {
    setImageFile(e.target.files[0])
  }

  const handleClearClick = () => {
    if (!inputRef.current) return
    inputRef.current.value = ''
    setImageFile(null)
  }

  useEffect(() => {
    if (!imageFile) return setPreview(initial)

    const nextPreview = URL.createObjectURL(imageFile)
    setPreview(nextPreview)

    return () => {
      URL.revokeObjectURL(nextPreview)
      setPreview(initial)
    }
  }, [imageFile])

  return (
    <div>
      <img src={preview} alt='이미지 미리보기' className={styles.preview} />
      <label htmlFor='image' className={styles.imgChangeBtn}>
        Change picture
      </label>
      <input
        type='file'
        name='image'
        id='image'
        accept='image/png, image/jpeg'
        ref={inputRef}
        onChange={handleChange}
        className={styles.fileInput}
      />
      {imageFile && (
        <button type='button' className={styles.imgClearBtn} onClick={handleClearClick}>
          Cancel
        </button>
      )}
    </div>
  )
}
