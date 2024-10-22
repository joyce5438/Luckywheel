import { useState, useEffect } from 'react'
import Wheel from '../components/Wheel'
import Results from '../components/Results'
import GoldCoins from '../components/GoldCoins'
import styles from '../styles/Wheel.module.css'

export default function WheelPage() {
  const [prizes, setPrizes] = useState([])
  const [results, setResults] = useState([])
  const [numSpins, setNumSpins] = useState(1)
  const [isSpinning, setIsSpinning] = useState(false)


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

  const handleMultiSpin = async () => {
    if (isSpinning) return
    setIsSpinning(true)
    for (let i = 0; i < numSpins; i++) {
      if (prizes.length === 0) break
      handleSpin()
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
    setIsSpinning(false)
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
          onChange={(e) => setNumSpins(Math.max(1, parseInt(e.target.value)))}
        />
        <button onClick={handleMultiSpin} disabled={isSpinning}>
          {isSpinning ? '抽獎中...' : '送出'}
        </button>
      </div>
      <Wheel prizes={prizes} onSpin={handleSpin} isSpinning={isSpinning} />
      <Results results={results} />
      <button className={styles.spinButton} onClick={handleSpin} disabled={isSpinning}>
        {isSpinning ? '抽獎中...' : '按一下抽獎'}
      </button>
      <GoldCoins isSpinning={isSpinning} />
    </div>
  )
}