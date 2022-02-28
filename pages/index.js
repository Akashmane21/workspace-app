import Head from 'next/head'
import Image from 'next/image'
import LeftMenu from '../Comps/LeftMenu'
import Nav from '../Comps/Nav'
import styles from '../styles/Home.module.scss'
import Mui from './Mui'
import { useCounter } from "../Context/Context";

export default function Home() {
  const { isTheme , isMenu} = useCounter();

  return (
    <div className={styles.container}>
      <Head>
        <title>LinkData</title>
        <meta name="description" content="LinkData Manages your whole Links and Workspace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Nav />
        {
                isMenu ? (
                  <LeftMenu />
                ) : ( 
                  <>
        <div className="block">
          <div className="left">
              <LeftMenu />
          </div>

          <div className="right" style={{backgroundColor:isTheme ? "#011229c9" : "white" , color:isTheme ? "white" : "black" }}>
              <h1>Right</h1>
             

          </div>
        </div>
</>)
        }

    
    </div>
  )
}
