import { useState, useEffect } from 'react'
import Wheel from '../components/Wheel'
import Results from '../components/Results'
import styles from '../styles/Wheel.module.css'

export default function WheelPage() {
  const [prizes, setPrizes] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    const storedPrizes = JSON.parse(localStorage.getItem('prizes') || '[]')
    setPrizes(storedPrizes)
  }, [])

  const handleSpin = () => {
    if (prizes.length === 0) return
    const winningPrize = prizes[Math.floor(Math.random() * prizes.length)]
    setResults(prev => [`恭喜中獎：${winningPrize}`, ...prev])
  }

  return (
    <div className={styles.container}>
      <h1>幸運抽獎輪盤</h1>
      <Wheel prizes={prizes} onSpin={handleSpin} />
      <Results results={results} />
    </div>
  )
}