import { useRouter } from 'next/router'
import { Popconfirm, message } from 'antd';

import firebase from "../../db/firebase";
import { useEffect, useState } from "react";
import * as React from "react";

import { Button, IconButton, TextField } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import moment from 'moment';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Modal } from 'antd';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useCounter } from "../../Context/Context";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Link from 'next/link'
import dynamic from "next/dynamic";
import Head from 'next/head';
import Header from '../../Comps/Header';


  const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  });
  
  



const Post = () => {
  const router = useRouter()
  const {uid}=useCounter()

  const { Did } = router.query
  if(Did!=undefined){
    localStorage.setItem("Did",Did)
  }
  else{

    console.log("Did error");
  }

  const [isload, setisload] = useState(true);
  const [title, settitle] = useState('Unnamed file')
  const [Share, setShare] = useState(false)
  const [value, setValue] = useState("");
const [acdata, setacdata] = useState('')
 

  useEffect(() => {
   
     
  firebase.auth().onAuthStateChanged(async (User)=>{
    if(User)
    {


     
    const idd=await localStorage.getItem("Did")
    console.log(User.uid);
    const fire= firebase.database().ref(`Linksdata/${User.uid}/Docs/${idd}`);
     const base = fire.on("value", (snapshot) => {
       if(snapshot.val()!=null){
         settitle(snapshot.val().Title)
         setValue(snapshot.val().data);
         
  let val=document.querySelectorAll('code')
  for (let i = 0; i < val.length; i++) {
    const element = val[i];
   element.classList.add("itscode")
  
    
  }

       }

   });

     
    }})
     
  hljs.initHighlightingOnLoad()



  }, [])



  async function submit() {
      
    var delta = document.querySelector('.ql-editor').innerHTML
    
    const Data={
        Title:title,
        isShare:Share,
        data:delta,
        Last:moment().format()
    }
    const main = await firebase.database().ref(`Linksdata/${uid}/Docs/${Did}`);
    main.update(Data)
    message.success("Saved Successfully");
  
  }

  function imageHandler() {
    var range = this.quill.getSelection();
    
  var url = prompt('please copy paste the  url here.');
  var height=prompt('please enter height in px.');
  var width=prompt('please enter width in %.');

  if(url){
    var range = this.quill.getSelection();
    const ifra=`<img src=${url} height=${height}px width=${width}%></iframe>`
     this.quill.clipboard.dangerouslyPasteHTML(range.index, ifra);
        
  }

}

async function Hr(){
  var range = this.quill.getSelection();
  var text =await this.quill.getText(range.index, range.length);
  
 
  this.quill.deleteText(range.index, range.length)
  this.quill.clipboard.dangerouslyPasteHTML(range.index, `<code>${text}</code>`);
     

  

}




function Upper(){

  var url = prompt('please copy paste the  url here.');
  var height=prompt('please enter height.');
  var width=prompt('please enter width.');

  if(url && height && width){
    var range = this.quill.getSelection();
    const ifra=`<iframe src=${url} height=${height}px width=${width}%></iframe>`
     this.quill.clipboard.dangerouslyPasteHTML(range.index, ifra);
        
  }
}






const modules = {
  toolbar:{
      container:[
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike", "link"], // toggled buttons
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["blockquote", "code-block"],
        
    
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" } , {list : "star"}],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ align: [] }],
        ["image"],
        ["video"],
        ["clean"],
        ["Upper", "Hr" , "Padding"],
      ],
      handlers: {
        image: imageHandler,
        Upper:Upper,
        Hr:Hr,
        
    }
  } 

};




const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

async function Copy(){
 
  var delta = document.querySelector('.ql-editor').innerHTML
    
  
      const Data={
          Title:title,
          isShare:true,
          data:delta,
          Last:moment().format()
      }
      const main = await firebase.database().ref(`Linksdata/${uid}/Docs/${Did}`);
      main.update(Data)
      navigator.clipboard.writeText(`http://localhost:3000/Shared/${Did}`);
      message.success("Copied Successfully"); 

}

async function setName(){
  var name= prompt("Enter The File Name")
  if(name){
    await settitle(name)

  }
}

  return(
      <>
     
      <Modal className='model' title="Share Docs" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <h4>Copy & Share the below link</h4>
        <div className="link" onClick={Copy}>
        <h3 >{`http://localhost:3000/Shared/${Did}`} </h3>
<ContentCopyIcon style={{color:"white"}}/>
        </div>
      </Modal>

     


      <div className="doc_header">
        <div className="doc_headerr" style={{alignItems:"center"}}>
          <Link href='/Docs'>

        <IconButton >
          <ArrowBackIcon />
        </IconButton>
          </Link>
        <h2>{title}</h2>
        <IconButton>
          <DriveFileRenameOutlineIcon style={{color:'green'}} onClick={setName} />
        </IconButton>

        </div>
          {/* <TextField label="Title" variant='standard' value={title} onChange={(e)=> settitle(e.target.value)} /> */}
          <div className="btns">


          <Button className='share' variant='outlined' style={{borderRadius:30 }} startIcon={<ShareIcon />} onClick={showModal}>Share</Button>
          <Button  variant='contained'  startIcon={<SaveIcon />} onClick={submit}>Save</Button>
          </div>
      </div>


      <QuillNoSSRWrapper
        modules={modules}
        placeholder="compose here"
        value={value}
        // onChange={(e)=>  console.log(e)}
        theme="snow"
      />
      </>
  ) 
}

export default Post

