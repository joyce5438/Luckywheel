import styles from '../styles/SettingsPanel.module.css'

export default function SettingsPanel({ removeWinner, setRemoveWinner, playSounds, setPlaySounds }) {
  return (
    <div className={styles.settingsPanel}>
      <div className={styles.settingItem}>
        <span>將中獎者移出輪盤</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={removeWinner}
            onChange={(e) => setRemoveWinner(e.target.checked)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.settingItem}>
        <span>播放音效</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={playSounds}
            onChange={(e) => setPlaySounds(e.target.checked)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  )
}