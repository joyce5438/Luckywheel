import { useState, useEffect } from 'react'
import styles from '../styles/Wheel.module.css'

export default function Wheel({ prizes, onSpin, isSpinning }) {
  const [currentRotation, setCurrentRotation] = useState(0)

  useEffect(() => {
    if (isSpinning) {
      const randomSpin = Math.floor(Math.random() * 360) + 1440
      setCurrentRotation(prev => prev + randomSpin)
    }
  }, [isSpinning])

  // 生成 HSL 顏色
  const getHSLColor = (index, total) => {
    const hue = (index / total) * 360
    return `hsl(${hue}, 70%, 70%)`
  }

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
              transform: `rotate(${(360 / prizes.length) * index}deg)`,
              backgroundColor: getHSLColor(index, prizes.length)
            }}
          >
            <span className={styles.sliceText}>{prize}</span>
          </div>
        ))}
      </div>
    </div>
  )
}