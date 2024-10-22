import '../styles/globals.css'
import Head from 'next/head'
import { useState, useEffect } from 'react'

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // 從 localStorage 讀取主題設置
    const storedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(storedDarkMode)
  }, [])

  useEffect(() => {
    // 當主題改變時，更新 body 的 class
    document.body.classList.toggle('dark-mode', darkMode)
    // 保存主題設置到 localStorage
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

export default MyApp