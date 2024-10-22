import { useRouter } from 'next/router'
import Link from 'next/link'

export default function LanguageSwitcher() {
  const router = useRouter()

  const getLanguageName = (locale) => {
    switch (locale) {
      case 'zh':
        return '中文'
      case 'en':
        return 'English'
      case 'ja':
        return '日本語'
      default:
        return locale
    }
  }

  return (
    <div>
      {router.locales.map((locale) => (
        <Link 
          key={locale} 
          href={router.asPath} 
          locale={locale}
        >
          <span 
            style={{ 
              marginRight: '10px', 
              cursor: 'pointer', 
              color: router.locale === locale ? 'blue' : 'black',
              textDecoration: router.locale === locale ? 'underline' : 'none'
            }}
          >
            {getLanguageName(locale)}
          </span>
        </Link>
      ))}
    </div>
  )
}