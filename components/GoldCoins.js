import { useEffect, useRef, useState } from 'react'
import styles from '../styles/GoldCoins.module.css'

export default function GoldCoins({ showCoins, playSounds }) {
  const [audio, setAudio] = useState(null)
  const coinCountRef = useRef(0)

  useEffect(() => {
    const audioPath = process.env.NEXT_PUBLIC_AUDIO_PATH || '/coin-sound.mp3'
    const newAudio = new Audio(audioPath)
    newAudio.volume = 0.5 // 設置音量
    newAudio.loop = true // 設置循環播放
    setAudio(newAudio)

    return () => {
      if (newAudio) {
        newAudio.pause()
        newAudio.currentTime = 0
      }
    }
  }, [])

  useEffect(() => {
    if (showCoins) {
      coinCountRef.current = 0
      showConfetti()
    }
  }, [showCoins])

  const showConfetti = () => {
    const coinCount = 100
    for (let i = 0; i < coinCount; i++) {
      createCoin()
    }
    if (playSounds && audio) {
      audio.play().catch(error => console.error('Error playing sound:', error))
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

    coinCountRef.current++

    setTimeout(() => {
      document.body.removeChild(coin)
      coinCountRef.current--
      if (coinCountRef.current === 0 && audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }, duration * 1000)
  }

  return null
}