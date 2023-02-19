import Link from 'next/link'
import './global.css'
import styles from './layout.module.css'

// 隔几秒重新验证下数据
export const revalidate = 10

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>账户中心</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
        <meta name="renderer" content="webkit" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body>
        <header className={styles.navHeader}>
        </header>
        <main>{children}</main>
        <footer>
        </footer>
      </body>
    </html>
  )
}

