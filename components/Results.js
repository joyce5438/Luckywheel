import styles from '../styles/Results.module.css'

export default function Results({ results }) {
  return (
    <div className={styles.results}>
      <h2>{t('resultsTitle')}</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  )
}