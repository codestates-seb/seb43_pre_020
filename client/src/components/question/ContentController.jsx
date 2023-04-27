import styles from '../../pages/Question.module.scss'

export default function ContentController({ editHandler, deleteHandler }) {
  return (
    <div className={styles.edit}>
      <button type='button' onClick={editHandler}>
        Edit
      </button>{' '}
      <button className={styles.controllerDeleteBtn} type='button' onClick={deleteHandler}>
        Delete
      </button>
    </div>
  )
}
