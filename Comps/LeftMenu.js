import {useState , useEffect} from 'react'
import { useCounter } from "../Context/Context";

export default function LeftMenu() {
    const { isTheme,setisTheme} = useCounter();

  return (
    <>
        <div className="LeftMenu" style={{backgroundColor:isTheme ? "#011229c9" : "white" , color:isTheme ? "white" : "black" }}>
            <h1>Left Menu</h1>
        </div>
    </>
  )
}
