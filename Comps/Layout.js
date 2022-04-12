
import Head from 'next/head'
import Script from 'next/script'
import 'antd/dist/antd.css'
import firebase from '../db/firebase'
import GlobaldataProider from "../Context/Context"
import Header from './Header';
import React, { Component , useState , useEffect } from 'react';
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const [isuser, setisuser] = useState(true)

useEffect(() => {

  
  firebase.auth().onAuthStateChanged((User)=>{
    if(!User)
    {
      console.log(User);
     router.push('./Auth')
    }
    else{
      console.log(User);
    }
  })
}, [])

 
  
  return (
    
    <GlobaldataProider>

   
    <Head>
  <link rel='manifest' href='/manifest.json' />
  <meta charset="utf-8" />
    <link rel="icon" href="icons/icon-512.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="black" />
        <meta name="apple-mobile-web-app-status-bar-style" content="red" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="red-translucent"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
        <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
        <link
          href="//cdn.quilljs.com/1.3.6/quill.bubble.css"
          rel="stylesheet"
        />

        <script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>
        <link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/default.min.css" />
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/highlight.min.js"></script>

    <meta  name="description" content="Manage you WorkSpace here " />

</Head>   
<Script src="../Comps/image-resize.js"></Script>







    <div className="content">
      { children }
    </div>
    
    </GlobaldataProider>
   
  );
}
 
export default Layout;