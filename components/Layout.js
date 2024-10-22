import styles from '../styles/Layout.module.css'

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1>幸運抽獎輪盤</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>© 2023 幸運抽獎輪盤. All rights reserved.</p>
      </footer>
    </div>
  )
}