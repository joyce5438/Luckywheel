import { useState, useEffect } from 'react'
import Wheel from '../components/Wheel'
import Results from '../components/Results'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [prizes, setPrizes] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('/api/prizes')
      .then(res => res.json())
      .then(data => setPrizes(data))
  }, [])

  const handleSpin = async () => {
    const res = await fetch('/api/draw', { method: 'POST' })
    const result = await res.json()
    setResults(prev => [result, ...prev])
  }

  return (
    <div className={styles.container}>
      <h1>幸運抽獎輪盤</h1>
      <Wheel prizes={prizes} onSpin={handleSpin} />
      <Results results={results} />
    </div>
  )
}