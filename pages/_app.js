import '../styles/globals.css'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // 从 localStorage 读取主题设置，如果没有设置，默认为 false（浅色模式）
    const storedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(storedDarkMode)
  }, [])

  useEffect(() => {
    // 当主题改变时，更新 body 的 class
    document.body.classList.toggle('dark-mode', darkMode)
    // 保存主题设置到 localStorage
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </Head>
      <Component {...pageProps} darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  )
}

export default appWithTranslation(MyApp)