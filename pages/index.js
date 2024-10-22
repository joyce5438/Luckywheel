import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [prizes, setPrizes] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    const prizeList = prizes.split('\n').filter(prize => prize.trim() !== '')
    localStorage.setItem('prizes', JSON.stringify(prizeList))
    router.push('/wheel')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>輸入獎項</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={prizes}
          onChange={(e) => setPrizes(e.target.value)}
          placeholder="請輸入獎項，每行一個"
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>開始抽獎</button>
      </form>
    </div>
  )
}