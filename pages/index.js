import Head from 'next/head'
import Image from 'next/image'
import LeftMenu from '../Comps/LeftMenu'
import Nav from '../Comps/Nav'
import styles from '../styles/Home.module.scss'
import Mui from './Mui'
import { useCounter } from "../Context/Context";
import firebase from '../db/firebase'
import { useEffect , useState  } from 'react'
import { useRouter } from "next/router";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Links from '../Comps/Links'
import Notes from '../Comps/Notes'
import Files from '../Comps/Files'
import Todos from '../Comps/Todos'




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}






export default function Home() {
  const { query } = useRouter();

  

  // const { isTheme , isMenu , Open_Coll, setOpen_Coll , All_data , setAll_data} = useCounter();
  const { isTheme,setisTheme , isMenu, setisMenu, All_Collection ,
    setAll_Collection ,Open_Coll, setOpen_Coll , open ,  All_data , setAll_data} = useCounter();
const [Alldata, setAlldata] = useState({"Name":"Developed By Innovarithm" ,"Image" : "https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2FLogio.png?alt=media&token=576ffd49-1683-4589-92a7-784e6eff471f" })
const [AllLinks, setAllLinks] = useState([])
const [AllNotes, setAllNotes] = useState([])
const [AllFiles, setAllFiles] = useState([])
const [AllTodos, setAllTodos] = useState([])


const [value, setValue] = React.useState(0);
const [Name, setName] = useState('')

const handleChange = (event, newValue) => {
  setValue(newValue);
};
  useEffect(()=>{

    console.log(query);
    
    const todoref = firebase.database().ref(`Linksdata/Akash/All_Coll/My Workspace/info`);
    todoref.on('value' , (snapshot)=>{
      const todos =snapshot.val()
      setAlldata(todos)
      try{
        
        let getcomp=document.getElementById("My Workspace");
        getcomp.classList.add("active");  
      }
      catch{
        console.log("err");
      }
    })

    const links =  firebase.database().ref(`Linksdata/Akash/All_Coll/My Workspace/Links`);
    links.on('value' , (snapshot)=>{
      const todoList = []
      const todos =snapshot.val()
      for(let id in todos){
        todoList.push({id, ...todos[id]})
      }
      const reversed = todoList.reverse()
       setAllLinks(reversed)
      
    })
  
  
  
    const Notes =  firebase.database().ref(`Linksdata/Akash/All_Coll/My Workspace/Notes`);
    Notes.on('value' , (snapshot)=>{
      const todoList = []
      const todos =snapshot.val()
      for(let id in todos){
        todoList.push({id, ...todos[id]})
      }
      const reversed = todoList.reverse()
      setAllNotes(reversed)      
    })
  
  
    const Files =  firebase.database().ref(`Linksdata/Akash/All_Coll/My Workspace/Files`);
    Files.on('value' , (snapshot)=>{
      const todoList = []
      const todos =snapshot.val()
      for(let id in todos){
        todoList.push({id, ...todos[id]})
      }
      const reversed = todoList.reverse()
      setAllFiles(reversed)      
    })
  
  
    const Todos =  firebase.database().ref(`Linksdata/Akash/All_Coll/My Workspace/Todos`);
    Todos.on('value' , (snapshot)=>{
      const todoList = []
      const todos =snapshot.val()
      for(let id in todos){
        todoList.push({id, ...todos[id]})
      }
      const reversed = todoList.reverse()
      setAllTodos(reversed)      
    })


   
  
      
  },  [ ]);




  

 const openall = async (name)=>{
  setisMenu(false)
  let getcomp=document.getElementById(name);
  try{
    let rem=document.getElementById(Name)
    rem.classList.remove('active')

  }
  catch{
    console.log("err")
  }
  getcomp.classList.add("active");  

  setName(name)

  const todoref =await firebase.database().ref(`Linksdata/Akash/All_Coll/${name}/info`);
  todoref.on('value' , (snapshot)=>{
    const todoList = []
    const todos =snapshot.val()
    setAlldata(todos)
  })
    


  const links = await firebase.database().ref(`Linksdata/Akash/All_Coll/${name}/Links`);
  links.on('value' , (snapshot)=>{
    const todoList = []
    const todos =snapshot.val()
    for(let id in todos){
      todoList.push({id, ...todos[id]})
    }
    const reversed = todoList.reverse()
     setAllLinks(reversed)
    console.log(AllLinks);
    
  })



  const Notes = await firebase.database().ref(`Linksdata/Akash/All_Coll/${name}/Notes`);
  Notes.on('value' , (snapshot)=>{
    const todoList = []
    const todos =snapshot.val()
    for(let id in todos){
      todoList.push({id, ...todos[id]})
    }
    const reversed = todoList.reverse()
    setAllNotes(reversed)
    console.log(AllLinks);
    
  })


  const Files = await firebase.database().ref(`Linksdata/Akash/All_Coll/${name}/Files`);
  Files.on('value' , (snapshot)=>{
    const todoList = []
    const todos =snapshot.val()
    for(let id in todos){
      todoList.push({id, ...todos[id]})
    }
    const reversed = todoList.reverse()
    setAllFiles(reversed)
    console.log(AllLinks);
    
  })


  const Todos = await firebase.database().ref(`Linksdata/Akash/All_Coll/${name}/Todos`);
  Todos.on('value' , (snapshot)=>{
    const todoList = []
    const todos =snapshot.val()
    for(let id in todos){
      todoList.push({id, ...todos[id]})
    }
    const reversed = todoList.reverse()
    setAllTodos(reversed)
    console.log(AllLinks);
    
  })



  

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>LinkData</title>
        <meta name="description" content="LinkData Manages your whole Links and Workspace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <Nav />
        {
                isMenu ? (
                  <div className="LeftMenu" style={{backgroundColor:isTheme ? "#011229c9" : "white" , color:isTheme ? "white" : "black" }}>
                   <div className='allflex'>
                  {All_Collection ? All_Collection.map((data , key)=>
      
                    <div className='ALl_coll' key={key} id={data.Name} onClick={()=>openall(data.Name)}>
                    <img src={data.Image} />
                    <h1>{data.Name}</h1>
                    </div>
                  
                   ) : ( <> </>)}
                   </div>
              </div>
                ) : ( 
                  <>
        <div className="block">
          <div className="left">
          <div className="LeftMenu" style={{backgroundColor:isTheme ? "#011229c9" : "white" , color:isTheme ? "white" : "black" }}>
          <div className='allflex'>
          {All_Collection ? All_Collection.map((data , key)=>

<div className='ALl_coll' key={key} id={data.Name} onClick={()=>openall(data.Name)}>
<img src={data.Image} />
<h1>{data.Name}</h1>
</div>

) : ( <> </>)}
</div>
        </div>
          </div>

          <div className="right" style={{backgroundColor:isTheme ? "#011229c9" : "white" , color:isTheme ? "white" : "black" }}>
         

             { Alldata && 
               <div className='main_title'>
               <img src={Alldata.Image} alt={Alldata.Name}/>
               <h1>{Alldata.Name}</h1>
               </div>
             
             
              }
  







<Box sx={{ width: '100%' }}   >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered
        // variant="scrollable"
        // scrollButtons="auto"
         >
          <Tab label="Notes" {...a11yProps(0)} />
          <Tab label="Links" {...a11yProps(1)} />
          <Tab label="Files" {...a11yProps(2)} />
          <Tab label="Todos" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Notes Name={Name} AllNotes={AllNotes} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Links Name={Name} AllLinks={AllLinks} />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Files Name={Name} AllFiles={AllFiles} />
      </TabPanel>
      <TabPanel value={value} index={3}>
       <Todos Name={Name} AllTodo={AllTodos} />
      </TabPanel>
    </Box>





          </div>
        </div>
</>)
        }

    
    </div>
  )
}
