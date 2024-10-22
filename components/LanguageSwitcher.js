import { useRouter } from 'next/router'
import Link from 'next/link'

export default function LanguageSwitcher() {
  const router = useRouter()

  return (
    <div>
      {router.locales.map((locale) => (
        <Link key={locale} href={router.asPath} locale={locale} legacyBehavior>
          <a style={{ marginRight: '10px', cursor: 'pointer', color: router.locale === locale ? 'blue' : 'black' }}>
            {locale}
          </a>
        </Link>
      ))}
    </div>
  )
}