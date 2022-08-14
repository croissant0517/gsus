import type { ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import Header from '../Header/Header'

type LayoutProps = {
    children: ReactNode,
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gsus</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/jesus.png" />
      </Head>

      <Header />

      <main className={styles.main}>
        {children}
        {/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>

          <Link
            href="/about"
            className={styles.card}
          >
            <a>About &rarr;</a>
          </Link>
          <Link
            href="/video"
            className={styles.card}
          >
            <a>Video &rarr;</a>
          </Link>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <p>ⓒ {new Date().getFullYear()} All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default Layout;