import React from "react";
import Head from "next/head";
import Nav from "../Comps/Nav";
import styles from "../styles/Home.module.scss";
import { useCounter } from "../Context/Context";
import firebase from "../db/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import WorkSpace from "../Comps/Right_blocks/WorkSpace";
import LeftMenu from "../Comps/LeftMenu";
import Header from "../Comps/Header";

export default function Workspace() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className="block">
        <div className="left">
          <LeftMenu active="Workspace" />
        </div>

        <div className="right">
          <Header />
          <WorkSpace />
        </div>
      </div>
    </div>
  );
}
