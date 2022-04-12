import React from 'react'
import Head from "next/head";
import Nav from "../Comps/Nav";
import styles from "../styles/Home.module.scss";
import { useCounter } from "../Context/Context";
import firebase from "../db/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Workspace from "../Comps/Right_blocks/WorkSpace";
import LeftMenu from "../Comps/LeftMenu";
import Header from "../Comps/Header";

export default function Sheets() {
    const router = useRouter()

  return (
    <div className={styles.container}>
    <Head>
      <title>Work Sheets</title>
      <meta
        name="description"
        content="LinkData Manages your whole Links and Workspace"
      />
     </Head>


  

    <div className="block">
      <div className="left">
        <LeftMenu active='Sheets' />
      </div>

      <div className="right">

       
        {/* <Header /> */}
        <h1>Sheets</h1>



        
      </div>



    </div>
  </div>
  )
}
