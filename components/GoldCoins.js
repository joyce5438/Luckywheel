import { useEffect } from 'react'
import styles from '../styles/GoldCoins.module.css'

export default function GoldCoins({ isSpinning }) {
  useEffect(() => {
    if (isSpinning) {
      showConfetti()
    }
  }, [isSpinning])

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
      document.body.removeChild(coin)
    }, duration * 1000)
  }

  return null
}