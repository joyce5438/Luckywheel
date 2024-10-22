import { useEffect, useRef } from 'react'
import styles from '../styles/GoldCoins.module.css'

export default function GoldCoins({ showCoins, playSounds }) {
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Audio('/coin-sound.mp3')
    audioRef.current.volume = 0.5 // 設置音量
  }, [])

  useEffect(() => {
    if (showCoins) {
      showConfetti()
    }
  }, [showCoins])

  const showConfetti = () => {
    for (let i = 0; i < 100; i++) {
      createCoin()
    }
  }

  const createCoin = () => {
    const coin = document.createElement('div')
    coin.classList.add(styles.goldCoin)
    const startX = Math.random() * window.innerWidth
    const startY = -Math.random() * window.innerHeight / 2
    const duration = 3 + Math.random() * 2
    const rotation = Math.random() * 360

    coin.style.left = `${startX}px`
    coin.style.top = `${startY}px`
    coin.style.animationDuration = `${duration}s`
    coin.style.transform = `rotate(${rotation}deg)`

    document.body.appendChild(coin)

    setTimeout(() => {
      if (playSounds && audioRef.current) {
        const sound = audioRef.current.cloneNode()
        sound.play()
      }
      document.body.removeChild(coin)
    }, duration * 1000)
  }

  return null
}