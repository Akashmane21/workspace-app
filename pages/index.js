import Head from "next/head";
import Nav from "../Comps/Nav";
import styles from "../styles/Home.module.scss";
import { useCounter } from "../Context/Context";
import firebase from "../db/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as React from "react";

import Workspace from "../Comps/Right_blocks/WorkSpace";
import LeftMenu from "../Comps/LeftMenu";
import Header from "../Comps/Header";
import SmallCal from '../Comps/googleCalendar/weekView/components/SmallCal'

export default function Home() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>WorkSpace</title>
        <meta
          name="description"
          content="LinkData Manages your whole Links and Workspace"
        />
       
      </Head>

  
    

      <div className="block">
        <div className="left">
          <LeftMenu active='Dashboard' />
        </div>

        <div className="right">

      <Header />
         <br />
          {/* <div className="Dash">

          <img src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ" alt="" />
          </div> */}

          <div className="small">
        <SmallCal isDash={true} />
      </div>



          
        </div>



      </div>
    </div>
  );
}
