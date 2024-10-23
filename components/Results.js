import styles from '../styles/Results.module.css'
import { useTranslation } from 'next-i18next'

export default function Results({ results }) {
  const { t } = useTranslation('common')

  return (
    <div className={styles.results}>
      <h2 className={styles.title}>{t('resultsTitle')}</h2>
      <ul className={styles.list}>
        {results.map((result, index) => (
          <li key={index} className={styles.item}>{result}</li>
        ))}
      </ul>
    </div>
  )
}