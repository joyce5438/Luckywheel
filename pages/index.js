import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from '../styles/Home.module.css'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Home() {
  const [prizes, setPrizes] = useState('')
  const [error, setError] = useState('')
  const [sequenceNumber, setSequenceNumber] = useState('')
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleSubmit = (e) => {
    e.preventDefault()
    const prizeList = prizes.split('\n').filter(prize => prize.trim() !== '')
    if (prizeList.length === 0) {
      setError(t('noPrizesError'))
      return
    }
    localStorage.setItem('prizes', JSON.stringify(prizeList))
    router.push('/wheel')
  }

  const generateSequence = () => {
    const num = parseInt(sequenceNumber)
    if (isNaN(num) || num <= 0) {
      setError(t('invalidNumberError'))
      return
    }
    const sequence = Array.from({length: num}, (_, i) => i + 1).join('\n')
    setPrizes(sequence)
    setError('')
  }

  return (
    <div className={styles.container}>
      <LanguageSwitcher />
      <h1 className={styles.title}>{t('inputPrizes')}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={prizes}
          onChange={(e) => {
            setPrizes(e.target.value)
            setError('')
          }}
          placeholder={t('prizePlaceholder')}
          className={styles.textarea}
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.sequenceGenerator}>
          <input
            type="number"
            value={sequenceNumber}
            onChange={(e) => setSequenceNumber(e.target.value)}
            placeholder={t('enterNumber')}
            className={styles.sequenceInput}
          />
          <button 
            type="button" 
            onClick={generateSequence} 
            className={styles.generateButton}
          >
            {t('generateSequence')}
          </button>
        </div>
        <button type="submit" className={styles.button}>{t('startDrawing')}</button>
      </form>
    </div>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
