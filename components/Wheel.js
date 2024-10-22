import { useState, useEffect } from 'react'
import styles from '../styles/Wheel.module.css'

export default function Wheel({ prizes, onSpin }) {
  const [rotating, setRotating] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)

  const handleSpin = () => {
    if (!rotating && prizes.length > 0) {
      setRotating(true)
      const randomSpin = Math.floor(Math.random() * 360) + 1440
      setCurrentRotation(prev => prev + randomSpin)
      onSpin()
      setTimeout(() => setRotating(false), 3000)
    }
  }

  useEffect(() => {
    handleSpin()
  }, [prizes])

  return (
    <div className={styles.wheelContainer}>
      <div
        className={styles.wheel}
        style={{ transform: `rotate(${currentRotation}deg)` }}
      >
        {prizes.map((prize, index) => (
          <div
            key={index}
            className={styles.slice}
            style={{
              transform: `rotate(${(360 / prizes.length) * index}deg)`
            }}
          >
            <span className={styles.sliceText}>{prize}</span>
          </div>
        ))}
      </div>
    </div>
  )
}