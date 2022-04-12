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

import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import { TextareaAutosize } from "@mui/material";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
// import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

// import remarkGfm from 'remark-gfm'

export default function Workspace() {
  const router = useRouter();
  const [blog, setblog] = useState('')


  return (
    <div className={styles.container}>
      <div className="block">
        <div className="left">
          <LeftMenu active="Blogs" />
        </div>

        <div className="right">
          <Header />
          Blogs
          <div className="blog_box">

          <TextareaAutosize
      aria-label="empty textarea"
      onChange={(e)=> setblog(e.target.value) }
      placeholder="Enter Note Here"
      style={{ width: 210 , height:100 , borderRadius:4 , padding:10 , borderColor:'gray' }}

    />
          <ReactMarkdown
    children={blog}
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            // style={dark}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}
  />
          </div>
        </div>
      </div>
    </div>
  );
}
