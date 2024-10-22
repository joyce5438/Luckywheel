import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useState, useEffect } from 'react'
import Wheel from '../components/Wheel'
import Results from '../components/Results'
import GoldCoins from '../components/GoldCoins'
import SettingsPanel from '../components/SettingsPanel'
import styles from '../styles/Wheel.module.css'

export default function WheelPage({ darkMode, setDarkMode }) {
  const { t } = useTranslation('common')
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
    
    const storedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(storedDarkMode)
  }, [setDarkMode])

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode)
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const handleSpin = async () => {
    if (prizes.length === 0 || isSpinning) return
    setIsSpinning(true)
    setShowCoins(true)
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const winningPrize = prizes[Math.floor(Math.random() * prizes.length)]
    setResults(prev => [`${t('congratulations')}: ${winningPrize}`, ...prev])
    
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
      <LanguageSwitcher />
      <h1 className={styles.title}>{t('luckyDrawWheel')}</h1>
      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <label htmlFor="numSpins">{t('multiSpinCount')}:</label>
          <input
            type="number"
            id="numSpins"
            min="1"
            value={numSpins}
            onChange={(e) => setNumSpins(Math.max(1, parseInt(e.target.value)))}
          />
          <button onClick={handleMultiSpin} disabled={isSpinning}>
            {isSpinning ? t('drawing') : t('submit')}
          </button>
        </div>
        <div className={styles.wheelContainer}>
          <Wheel prizes={prizes} isSpinning={isSpinning} />
          <button className={styles.spinButton} onClick={handleSpin} disabled={isSpinning}>
            {isSpinning ? t('drawing') : t('spinOnce')}
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}