import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from '../styles/Home.module.css'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Home() {
  const [prizes, setPrizes] = useState('')
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleSubmit = (e) => {
    e.preventDefault()
    const prizeList = prizes.split('\n').filter(prize => prize.trim() !== '')
    localStorage.setItem('prizes', JSON.stringify(prizeList))
    router.push('/wheel')
  }

  return (
    <div className={styles.container}>
      <LanguageSwitcher />
      <h1 className={styles.title}>{t('inputPrizes')}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          value={prizes}
          onChange={(e) => setPrizes(e.target.value)}
          placeholder={t('prizePlaceholder')}
          className={styles.textarea}
        />
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