import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footerOuter}>
      <div className={styles.footerInner}>
        <div className={styles.imgSort}>
          {' '}
          <a href='/'>
            <img
              className={styles.logoImg}
              src={`${process.env.PUBLIC_URL}/assets/logo-only-graphic.svg`}
              alt='stackoverflow logo img'
            />
          </a>
          <div className={styles.box}>
            <h5>STACK OVERFLOW</h5>
            <ul>
              <li>Questions</li>
              <li>Help</li>
            </ul>
          </div>
        </div>
        <div className={styles.box}>
          <h5>PRODUCTS</h5>
          <ul>
            <li>Teams</li>
            <li>Advertising</li>
            <li>Collectives</li>
            <li>Talent</li>
          </ul>
        </div>
        <div className={styles.box}>
          <h5>COMPANY</h5>
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
          <h5>STACK EXCHANGE NETWORK</h5>
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
