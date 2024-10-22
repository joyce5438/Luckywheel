import { useState, useEffect } from 'react'
import Wheel from '../components/Wheel'
import Results from '../components/Results'
import styles from '../styles/Wheel.module.css'

export default function WheelPage() {
  const [prizes, setPrizes] = useState([])
  const [results, setResults] = useState([])
  const [numSpins, setNumSpins] = useState(1)

  useEffect(() => {
    const storedPrizes = JSON.parse(localStorage.getItem('prizes') || '[]')
    setPrizes(storedPrizes)
  }, [])

  const handleSpin = () => {
    if (prizes.length === 0) return
    const winningPrize = prizes[Math.floor(Math.random() * prizes.length)]
    setResults(prev => [`恭喜中獎：${winningPrize}`, ...prev])
    setPrizes(prev => prev.filter(prize => prize !== winningPrize))
  }

  const handleMultiSpin = () => {
    let spinsLeft = numSpins
    const spinInterval = setInterval(() => {
      if (spinsLeft > 0 && prizes.length > 0) {
        handleSpin()
        spinsLeft--
      } else {
        clearInterval(spinInterval)
      }
    }, 3000)
  }

  return (
    <div className={styles.container}>
      <h1>幸運抽獎輪盤</h1>
      <div className={styles.leftPanel}>
        <label htmlFor="numSpins">連抽次數:</label>
        <input
          type="number"
          id="numSpins"
          min="1"
          value={numSpins}
          onChange={(e) => setNumSpins(parseInt(e.target.value))}
        />
        <button onClick={handleMultiSpin}>送出</button>
      </div>
      <Wheel prizes={prizes} onSpin={handleSpin} />
      <Results results={results} />
      <button className={styles.spinButton} onClick={handleSpin}>按一下抽獎</button>
    </div>
  )
}