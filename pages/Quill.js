import dynamic from "next/dynamic";
import React, { useState } from "react";
import parse from "html-react-parser";
// import { ImageResize } from 'quill-image-resize-module';

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});



const ImageResize = dynamic(import("quill-image-resize-module"), {
    ssr: false,
    
  });

  
const modules = {
  toolbar:{
      container:[
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike", "link"], // toggled buttons
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ["blockquote", "code-block"],
        ["Upper", "Hr"],
    
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
      ],
      handlers: {
        image: imageHandler,
        Upper:Upper,
        Hr:Hr
    }
  } 
//   clipboard: {
//     matchVisual: false,
//   },
};

async function get() {
    var quill = new Quill("#editor");
    const data = await localStorage.getItem("QuillData");
    quill.root.innerHTML = "";
    quill.clipboard.dangerouslyPasteHTML(0, data);
  }

  async function submit() {
      
    var quill = new Quill("#editor");
    window.delta = quill.root.innerHTML;

    const Data={
        Title:title,
        isShare:Share,
        data:delta,
        Last:moment().format()
    }
    console.log(Data);
    const main = await firebase.database().ref(`Linksdata/Akash/Docs/${Did}`);
    main.update(Data)
  
  }

  function imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('please copy paste the image url here.');
    if(value){
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources);
    }
}

async function Hr(){
    var Hrline=await document.createElement('h6')
    var hh=await document.createElement('h1')
    Hrline.class='hello'

  var addressContainer = document.getElementsByClassName("ql-editor");
  addressContainer[0].append(Hrline)
  addressContainer[0].append(hh)
}

function Upper(){

  var url = prompt('please copy paste the  url here.');
  var height=prompt('please enter height.');
  var width=prompt('please enter width.');
  if(url && height && width){

    var cat=document.createElement('iframe')
    // <iframe width="560" height="315" src="https://www.youtube.com/embed/eGUEAvNpz48" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
    cat.class='hello'
    cat.height=`${height}`
    cat.width=`${width}%`
    cat.src=url
  
  
  var addressContainer = document.getElementsByClassName("ql-editor");
  addressContainer[0].append(cat)
  }
}


function download(){
    const input = document.getElementById('editor');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })

}


async function Addtitle(e){
    await settitle(e.target.value)
    // const idd=await localStorage.getItem("Did")
    // const todoref = await firebase.database().ref(`Linksdata/Akash/Docs/${idd}`);
    // todoref.update({
    //     "Title":title,
    // })
}


export default function Quill() {
  const [value, setValue] = useState("");

  return (
    <div>

      <QuillNoSSRWrapper
        modules={modules}
        placeholder="compose here"
        value={value}
        onChange={(e) => console.log(e)}
        theme="snow"
      />

    </div>
  );
}
