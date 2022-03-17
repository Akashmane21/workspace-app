import {useState , useEffect} from 'react'
import { useCounter } from "../Context/Context";
import firebase from '../db/firebase';
import Router from 'next/router'

export default function LeftMenu() {
    const { isTheme,setisTheme ,  All_Collection ,
      setAll_Collection ,Open_Coll, setOpen_Coll , open} = useCounter();
    
 const openall = async (name)=>{
open(name)
  // console.log(data);
//  await Router.push(`?name=${name}`)
//  window.location.reload(false)
}
   
  return (
    <>
       
    </>
  )
}
