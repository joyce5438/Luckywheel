import { useState, useEffect } from 'react'
import Wheel from '../components/Wheel'
import Results from '../components/Results'
import GoldCoins from '../components/GoldCoins'
import SettingsPanel from '../components/SettingsPanel'
import styles from '../styles/Wheel.module.css'

export default function WheelPage({ darkMode, setDarkMode }) {
  const [prizes, setPrizes] = useState([])
  const [results, setResults] = useState([])
  const [numSpins, setNumSpins] = useState(1)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showCoins, setShowCoins] = useState(false)
  const [removeWinner, setRemoveWinner] = useState(true)
  const [playSounds, setPlaySounds] = useState(false)

  useEffect(() => {
    const storedPrizes = JSON.parse(localStorage.getItem('prizes') || '[]')
    setPrizes(storedPrizes)
    
    // 從 localStorage 讀取主題設置
    const storedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(storedDarkMode)
  }, [setDarkMode])

  useEffect(() => {
    // 當主題改變時，更新 body 的 class
    document.body.classList.toggle('dark-mode', darkMode)
    // 保存主題設置到 localStorage
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const handleSpin = async () => {
    if (prizes.length === 0 || isSpinning) return
    setIsSpinning(true)
    setShowCoins(true)
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const winningPrize = prizes[Math.floor(Math.random() * prizes.length)]
    setResults(prev => [`恭喜中獎：${winningPrize}`, ...prev])
    
    if (removeWinner) {
      setPrizes(prev => prev.filter(prize => prize !== winningPrize))
    }
    
    setIsSpinning(false)
    setShowCoins(false)
  }

  const handleMultiSpin = async () => {
    if (isSpinning) return
    for (let i = 0; i < numSpins; i++) {
      if (prizes.length === 0) break
      await handleSpin()
      if (i < numSpins - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkMode : ''}`}>
      <h1 className={styles.title}>幸運抽獎輪盤</h1>
      <div className={styles.content}>
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
        <div className={styles.wheelContainer}>
          <Wheel prizes={prizes} isSpinning={isSpinning} />
          <button className={styles.spinButton} onClick={handleSpin} disabled={isSpinning}>
            {isSpinning ? '抽獎中...' : '按一下抽獎'}
          </button>
        </div>
        <div className={styles.rightPanel}>
          <SettingsPanel 
            removeWinner={removeWinner} 
            setRemoveWinner={setRemoveWinner}
            playSounds={playSounds}
            setPlaySounds={setPlaySounds}
            darkMode={darkMode}
            setDarkMode={setDarkMode} 
          />
          <Results results={results} />
        </div>
      </div>
      <GoldCoins showCoins={showCoins} playSounds={playSounds} />
    </div>
  )
}