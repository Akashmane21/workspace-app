import React from "react";
import Head from "next/head";
import Nav from "../Comps/Nav";
import styles from "../styles/Home.module.scss";
import { useCounter } from "../Context/Context";
import firebase from "../db/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Workspace from "../Comps/Right_blocks/WorkSpace";
import LeftMenu from "../Comps/LeftMenu";
import Header from "../Comps/Header";
import GoogleCalendar from '../Comps/googleCalendar';

export default function Calender() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());

  return (
    <div className={styles.container}>
      <Head>
        <title>Calendar</title>
        <meta
          name="description"
          content="LinkData Manages your whole Links and Workspace"
        />
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/2370/2370277.png" />
      </Head>

      <div className="block">
        <div className="left">
          <LeftMenu active="Calender" />
        </div>

        <div className="right">
          <Header />
          {/* <div className="Cal" style={{ margin: 40 }}> */}
            {/* <h1 className="text-center">React Calendar</h1>
            <div className="calendar-container">
              <Calendar onChange={setDate} value={date} />
            </div>
            <p className="text-center">
              <span className="bold">Selected Date:</span> {date.toDateString()}
            </p> */}
            <GoogleCalendar />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
