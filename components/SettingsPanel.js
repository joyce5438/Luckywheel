import { useTranslation } from 'next-i18next'
import styles from '../styles/SettingsPanel.module.css'

export default function SettingsPanel({ 
  removeWinner, 
  setRemoveWinner, 
  playSounds, 
  setPlaySounds, 
  darkMode, 
  setDarkMode,
  spinDuration,
  setSpinDuration
}) {
  const { t } = useTranslation('common')

  return (
    <div className={styles.settingsPanel}>
      <div className={styles.settingItem}>
        <span>{t('removeWinner')}</span>
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
        <span>{t('playSounds')}</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={playSounds}
            onChange={(e) => setPlaySounds(e.target.checked)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.settingItem}>
        <span>{t('darkMode')}</span>
         <label className={styles.switch}>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.settingItem}>
        <span>{t('spinDurationLabel')}</span>
        <div className={styles.spinDurationControl}>
          <input
            type="range"
            id="spinDuration"
            min="0.5"
            max="6"
            step="0.5"
            value={spinDuration}
            onChange={(e) => setSpinDuration(parseFloat(e.target.value))}
            className={styles.slider}
          />
          <span>{spinDuration.toFixed(1)}s</span>
        </div>
      </div>
    </div>
  )
}