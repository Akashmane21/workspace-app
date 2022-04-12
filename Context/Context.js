import { useState, createContext, useContext , useEffect } from "react";
import firebase from '../db/firebase'
const Globaldata = createContext();
import { useRouter } from "next/router";

export const useCounter = () => useContext(Globaldata);

function GlobaldataProider(props) {
  const router = useRouter();

 
  const [isTheme, setisTheme] = useState(false)
 const [isMenu, setisMenu] = useState(false)
 const [All_Collection, setAll_Collection] = useState([])


const [Userdata, setUserdata] = useState([])
const [isuser, setisuser] = useState(false)
const [uid, setuid] = useState('')
 useEffect(()=>{

  firebase.auth().onAuthStateChanged((User)=>{
    if(User)
    {
      setuid(User.uid);
      setUserdata(User)
      setisuser(true)


  const todoref = firebase.database().ref(`Linksdata/${User.uid}/CollectionName`);
  todoref.on('value' , (snapshot)=>{
    const todoList = []
    const todos =snapshot.val()
    for(let id in todos){
      todoList.push({id, ...todos[id]})
    }
    const reversed = todoList.reverse()
    setAll_Collection(reversed.reverse())
    console.log(reversed);
  })



}
else{
router.push('./Auth')
}
})

  

} , [ ])




  const value = {uid, setuid,isuser, setisuser , Userdata, setUserdata  ,  isTheme,setisTheme , isMenu, setisMenu , All_Collection ,setAll_Collection };

  return (
    <Globaldata.Provider value={value}>{props.children}</Globaldata.Provider>
  );
}

export default GlobaldataProider;
