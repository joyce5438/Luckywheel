import styles from '../styles/Results.module.css'
import { useTranslation } from 'next-i18next'

export default function Results({ results }) {
  const { t } = useTranslation('common')

  return (
    <div>
      <h2>{t('resultsTitle')}</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  )
}