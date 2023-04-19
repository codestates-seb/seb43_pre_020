import Header from './Header'
import Nav from './Nav'
import styles from './GeneralLayout.module.scss'

// 1. 전부 표시  : /home, questions/:id
// 2. 헤더만 표시 : /login, /signup
// 3. 헤더, 푸터만 표시 : /mypage, /ask

export default function GeneralLayout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Nav />
        <div className={styles.content}>
          <Main>{children}</Main>
          <Aside />
        </div>
      </div>
      <Footer />
    </>
  )
}

function Main({ children }) {
  return <main className={styles.main}>{children}</main>
}

function Aside() {
  return <aside className={styles.aside}>aside</aside>
}

function Footer() {
  return (
    <footer className={styles.footerOuter}>
      <div className={styles.footerInner}>footer</div>
    </footer>
  )
}
