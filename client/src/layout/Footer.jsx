import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footerOuter}>
      <div className={styles.footerInner}>
        {' '}
        <img
          className={styles.logoImg}
          src={`${process.env.PUBLIC_URL}/assets/logo-only-graphic.svg`}
          alt='stackoverflow logo img'
        />
        <div className={styles.box}>
          <div>STACK OVERFLOW</div>
          <ul>
            <li>Questions</li>
            <li>Help</li>
          </ul>
        </div>
        <div className={styles.box}>
          <div>PRODUCTS</div>
          <ul>
            <li>Teams</li>
            <li>Advertising</li>
            <li>Collectives</li>
            <li>Talent</li>
          </ul>
        </div>
        <div className={styles.box}>
          <div>COMPANY</div>
          <ul>
            <li>About</li>
            <li>Press</li>
            <li>Work Here</li>
            <li>Legal</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
            <li>Cookie Settings</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div className={styles.box}>
          <div>STACK EXCHANGE NETWORK</div>
          <ul>
            <li>Technology</li>
            <li>Culture & recreation</li>
            <li>Life & arts</li>
            <li>Science</li>
            <li>Professional</li>
            <li>Business</li>
          </ul>
        </div>
        <div className={styles.box2}>
          <div>Blog</div>
          <div>Facebook</div>
          <div>Twitter</div>
          <div>LinkedIn</div>
          <div>Instagram</div>
        </div>
      </div>
    </footer>
  )
}
