import { useRouter } from 'next/router'
import Link from 'next/link'

export default function LanguageSwitcher() {
  const router = useRouter()

  return (
    <div>
      {router.locales.map((locale) => (
        <Link key={locale} href={router.asPath} locale={locale}>
          <a style={{ marginRight: '10px' }}>{locale}</a>
        </Link>
      ))}
    </div>
  )
}