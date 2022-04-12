import Head from "next/head";
import Nav from "../../Comps/Nav";
import styles from "../../styles/Home.module.scss";
import { useCounter } from "../../Context/Context";
import firebase from "../../db/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as React from "react";
import Workspace from "../../Comps/Right_blocks/WorkSpace";
import LeftMenu from "../../Comps/LeftMenu";
import Header from "../../Comps/Header";
import Script from 'next/script'
import DocTable from "../../Comps/DocTable";
import moment from "moment";
import ArticleIcon from '@mui/icons-material/Article';
import { Button } from "@mui/material";
import FeedIcon from '@mui/icons-material/Feed';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
  const router = useRouter();
  const{ uid } =useCounter()


  let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
async function Create(){
  const id=await guid()
  const Data={
    Title:"Unnamed",
    isShare:false,
    data:"",
    date:moment().format("MMM Do YY"),
    Last:moment().format("MMM Do YY")
}
const main = await firebase.database().ref(`Linksdata/${uid}/Docs/${id}`);
main.set(Data)
.then(()=> router.push(`./Docs/${id}`))

  
}
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Docs</title>
        <meta
          name="description"
          content="Keep your Docs Safe with you anywhere"
        />
        <link rel="icon" href="https://persistentpro.e-box.co.in/images/icon/knowledge-based-problems-solved.svg" />
      </Head>

      

    <div className="block">
      <div className="left">
        <LeftMenu active='Docs' />
      </div>

      <div className="right">
        <Header />

       
    
        <div className="docheader">
         


          <div className="icon">
            {/* <FeedIcon style={{ fontSize:34 , color:"gray" }} /> */}
            <img src="https://persistentpro.e-box.co.in/images/icon/knowledge-based-problems-solved.svg" alt="logo" height="50px" />
            <h2>Docs</h2>
          </div>
<div className="leftbtns">

          <input type="text" placeholder="Search Doc" />
          <Button onClick={Create} startIcon={<AddIcon />} style={{ backgroundColor:"#7fd7f835" }} >New</Button>
</div>

        </div>
        <hr />


        <DocTable />




        
      </div>



    </div>

    </div>
  );
}
