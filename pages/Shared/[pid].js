import { useRouter } from "next/router";
import Head from "next/head";
import Nav from "../../Comps/Nav";
import styles from "../../styles/Home.module.scss";
import { useCounter } from "../../Context/Context";
import firebase from "../../db/firebase";
import { useEffect, useState } from "react";
import * as React from "react";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});


const Post = () => {
  const router = useRouter();
  const [isload, setisload] = useState(true);
  const [title, settitle] = useState('Unnamed file')
  const [Share, setShare] = useState(false)
  const [value, setValue] = useState("");


  const { pid } = router.query;
  if(pid!=undefined){
    localStorage.setItem("pid",pid)
  }
  else{

    console.log("pid");
  }

  useEffect(async () => {


 
     
    firebase.auth().onAuthStateChanged(async (User)=>{
      if(User)
      {
       
const idd=localStorage.getItem("pid")
const fire= firebase.database().ref(`Linksdata/${User.uid}/Docs/${idd}`);
 const base = fire.on("value", (snapshot) => {
   settitle(snapshot.val().Title)
   setValue(snapshot.val().data);
  });
}})
  }, []);


  
const modules = {
  toolbar:{
      container:[],
    
  } 

};
  return (
    <div >
      
<h1 className="read">{title}</h1>
<hr />
      <QuillNoSSRWrapper
        modules={modules}
        placeholder="compose here"
        value={value}
        readOnly= {true}
        theme="bubble"
      />

{/* <div dangerouslySetInnerHTML={{__html: value}}></div> */}
    </div>
  );
};

export default Post;
