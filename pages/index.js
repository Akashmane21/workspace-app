import Head from 'next/head'
import Image from 'next/image'
import Nav from '../Comps/Nav'
import styles from '../styles/Home.module.scss'
import Mui from './Mui'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>LinkData</title>
        <meta name="description" content="LinkData Manages your whole Links and Workspace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Nav />

    
    </div>
  )
}
