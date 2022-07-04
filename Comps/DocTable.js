import { Table, Tag, Space } from 'antd';
import React , { useState , useEffect} from 'react'
import 'antd/dist/antd.css'
import ArticleIcon from '@mui/icons-material/Article';
import { Button, IconButton } from '@mui/material';
import firebase from '../db/firebase'
import { useRouter } from "next/router";
import moment from 'moment';
import { Popconfirm, message } from 'antd';
import CachedIcon from '@mui/icons-material/Cached';
import { useCounter } from "../Context/Context";
import Link from 'next/link';

export default function DocTable() {
    const [data, setdata] = useState([])
    const router = useRouter();
    const { uid} =useCounter()



    const columns = [
        {
            title: 'Docs',
            dataIndex: 'icon',
            key: 'icon',
            render: text => <ArticleIcon style={{color:"green"}} />,
          },
        {
          title: 'Title',
          dataIndex: 'Title',
          key: 'Title',
          render: text => <a>{text}</a>,
        },

        {
          title: 'Created on',
          dataIndex: 'date',
          key: 'date',
          render: text => <a>{text}</a>,
        },
      
        {
          title: 'Last Modified',
          dataIndex: 'Last',
          key: 'Last',
          render: text => <a>{moment(text).startOf('hour').fromNow()}</a>,
        },
       
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
             
              <Button variant='text' onClick={()=> router.push(`Docs/${text.id}`)}>Edit</Button>

<Popconfirm
title="Are you sure to delete this task?"
onConfirm={()=> confirm(text.id)}
onCancel={cancel}
okText="Yes"
cancelText="No"
>
              <Button style={{color:"orangered"}}>Delete</Button>
  </Popconfirm>
              
            </Space>
          ),
        },
      ];
      
      useEffect(() => {
      
     
        const fire= firebase.database().ref(`Linksdata/${uid}/Docs`);
        const base = fire.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
        todoList.push({ id, ...todos[id] });
        }
        console.log(todoList);
        setdata(todoList)

   });

      }, [])

      function confirm(id) {
        const fire= firebase.database().ref(`Linksdata/${uid}/Docs/${id}`).remove();
        message.success("Deleted Successfully");
      }
      
      function cancel(e) {
        message.error('cancelled');
      }
      
      function Refresh(){
        const fire= firebase.database().ref(`Linksdata/${uid}/Docs`);
        const base = fire.on("value", (snapshot) => {
        const todoList = [];
        const todos = snapshot.val();
        for (let id in todos) {
        todoList.push({ id, ...todos[id] });
        }
        console.log(todoList);
        setdata(todoList)

   });
      }

  return (
    <>
    
<IconButton style={{ display:"flex" , marginLeft:"auto" }}>
<CachedIcon />
</IconButton>
{/* <Button style={{ justifyContent:"flex-end" }} onClick={Refresh} startIcon={ }>Refresh</Button> */}

    <Table columns={columns} dataSource={data} />
    </>
  )
}

  

  