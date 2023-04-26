import styles from './Aside.module.scss'

export default function Aside() {
  return (
    <aside className={styles.aside}>
      <div>
        <div className={styles.title}>The OverFlow Blog</div>
        <ul className={styles.contents}>
          <li>When setting up monitoring, less data is better (Ep. 563)</li>
          <li>Instantly verify your customers online with Open Banking APIs</li>
        </ul>
      </div>
      <div>
        <div className={styles.title}>Featured on Meta</div>
        <ul className={styles.contents}>
          <li>Improving the copy in the close modal and post notices - 2023 edition</li>
          <li>New blog post from our CEO Prashanth: Community is the future of AI</li>
          <li>Temporary policy: ChatGPT is banned</li>
          <li>The [protection] tag is being burninated</li>
          <li>Content Discovery initiative April 13 update: Related questions using a...</li>
          <li>Review our technical responses for the 2023 Developer Survey</li>
        </ul>
      </div>
    </aside>
  )
}
