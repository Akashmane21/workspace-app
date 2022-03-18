import { useState, createContext, useContext , useEffect } from "react";
import firebase from '../db/firebase'
const Globaldata = createContext();

export const useCounter = () => useContext(Globaldata);

function GlobaldataProider(props) {
 
  const [isTheme, setisTheme] = useState(false)
 const [isMenu, setisMenu] = useState(false)
 const [All_Collection, setAll_Collection] = useState([])
const [Open_Coll, setOpen_Coll] = useState(' ')
const [All_data, setAll_data] = useState([])

 useEffect(()=>{


  const todoref = firebase.database().ref('Linksdata/Akash/CollectionName');
  todoref.on('value' , (snapshot)=>{
    const todoList = []
    const todos =snapshot.val()
    for(let id in todos){
      todoList.push({id, ...todos[id]})
    }
    const reversed = todoList.reverse()
    setAll_Collection(reversed.reverse())
    console.log();
  })




  

} , [ ])

async function open(name){


    const todoref = firebase.database().ref(`Linksdata/Akash/All_Coll/${name}/info`);
    todoref.on('value' , (snapshot)=>{
      const todoList = []
      const todos =snapshot.val()
      let fff=[todos]
      console.log(fff);
    
      localStorage.setItem("Name",name)
    })
      
}



  const value = {open , setAll_data, All_data,  isTheme,setisTheme , isMenu, setisMenu , All_Collection ,setAll_Collection ,Open_Coll ,setOpen_Coll};

  return (
    <Globaldata.Provider value={value}>{props.children}</Globaldata.Provider>
  );
}

export default GlobaldataProider;
