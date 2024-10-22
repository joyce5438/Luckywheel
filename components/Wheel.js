import { useState } from 'react'
import styles from '../styles/Wheel.module.css'

export default function Wheel({ prizes, onSpin }) {
  const [rotating, setRotating] = useState(false)

  const handleSpin = () => {
    if (!rotating) {
      setRotating(true)
      onSpin()
      setTimeout(() => setRotating(false), 3000)
    }
  }

  return (
    <div className={styles.wheelContainer}>
      <div className={`${styles.wheel} ${rotating ? styles.rotating : ''}`}>
        {prizes.map((prize, index) => (
          <div
            key={index}
            className={styles.slice}
            style={{
              transform: `rotate(${(360 / prizes.length) * index}deg)`
            }}
          >
            <span className={styles.sliceText}>{prize.name}</span>
          </div>
        ))}
      </div>
      <button onClick={handleSpin} disabled={rotating}>
        {rotating ? '抽獎中...' : '按一下抽獎'}
      </button>
    </div>
  )
}