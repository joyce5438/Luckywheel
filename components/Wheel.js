import { useState, useEffect } from 'react'
import styles from '../styles/Wheel.module.css'

export default function Wheel({ prizes, isSpinning, spinDuration }) {
  const [currentRotation, setCurrentRotation] = useState(0)

  useEffect(() => {
    if (isSpinning) {
      const spinAngle = Math.floor(Math.random() * 360) + 720; // 至少旋轉兩圈
      setCurrentRotation(prevRotation => prevRotation + spinAngle);
    }
  }, [isSpinning])

  const getHSLColor = (index, total) => {
    const hue = (index / total) * 360
    return `hsl(${hue}, 70%, 70%)`
  }

  const animationStyle = {
    animation: isSpinning ? `spin ${spinDuration}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards` : 'none'
  };

  return (
    <div className={styles.wheel}>
      <div
        className={`${styles.wheelInner} ${isSpinning ? styles.spinning : ''}`}
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
