import dynamic from 'next/dynamic'
    import React, { useState } from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


    const Editor = dynamic( 
        () => import('react-draft-wysiwyg').then((module)=>module.Editor), {
      ssr: false,
    })

    
export default function draft() {
  return (
    <Editor />
  )
}
