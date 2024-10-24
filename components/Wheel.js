import { useState, useEffect } from 'react'
import styles from '../styles/Wheel.module.css'

export default function Wheel({ prizes, isSpinning, spinDuration }) {
  const [currentRotation, setCurrentRotation] = useState(0)

  useEffect(() => {
    if (isSpinning) {
      // 根據時間調整旋轉圈數
      const baseSpins = 3; // 基礎圈數
      const additionalSpins = Math.floor(spinDuration); // 根據時間增加圈數
      const totalSpins = baseSpins + additionalSpins;
      const spinAngle = (totalSpins * 360) + Math.floor(Math.random() * 360);
      
      setCurrentRotation(prevRotation => prevRotation + spinAngle);
    }
  }, [isSpinning, spinDuration])

  const getHSLColor = (index, total) => {
    const hue = (index / total) * 360
    return `hsl(${hue}, 70%, 70%)`
  }

  return (
    <div className={styles.wheel}>
      <div
        className={`${styles.wheelInner}`}
        style={{
          transform: `rotate(${currentRotation}deg)`,
          transition: isSpinning 
            ? `transform ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1)`
            : 'none'
        }}
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
