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
import Avatar from '@mui/material/Avatar';
// Create New Collection 
import SendIcon from '@mui/icons-material/Send';
  import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LoadingButton from '@mui/lab/LoadingButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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
  const [openmodel, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  // const { isTheme , isMenu , Open_Coll, setOpen_Coll , All_data , setAll_data} = useCounter();
  const { isTheme,setisTheme , isMenu, setisMenu, All_Collection ,
    setAll_Collection ,Open_Coll, setOpen_Coll , open ,  All_data , setAll_data} = useCounter();
const [Alldata, setAlldata] = useState({"Name":"Loading..." ,"Image" : "https://firebasestorage.googleapis.com/v0/b/reactcrud-7b0fc.appspot.com/o/Image%2Fmylogo-removebg-preview.png?alt=media&token=a59224d1-787b-4f9d-94d8-204e8c7f2b3c" })
const [AllLinks, setAllLinks] = useState([])
const [AllNotes, setAllNotes] = useState([])
const [AllFiles, setAllFiles] = useState([])
const [AllTodos, setAllTodos] = useState([])
const [isform, setisform] = useState(false)
const [loading, setLoading] = useState(false);
const [title, settitle] = useState('')
const [image, setimage] = useState('')
const [deleteid, setdeleteid] = useState('')
const [value, setValue] = React.useState(0);
const [Name, setName] = useState('My Workspace')

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




  

 const openall = async (name , id)=>{
  setisMenu(false)
console.log(id);  
setdeleteid(id)
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


  function AddNew(){
    setisform(true)

  }


  function AddLink(){
    setLoading(true)

 
    
    const todoref = firebase.database().ref(`Linksdata/Akash/CollectionName`);
    const Collection = {
        "Name":title,
        "Image":image
    };
    todoref.push(Collection)


    const main = firebase.database().ref(`Linksdata/Akash/All_Coll/${title}/info`);
    const Coll = {
        "Name":title,
        "Image":image
    };
    main.set(Coll)



    setLoading(false)
    setisform(false)
  }


  function Delete(){
    // toast(deleteid)
    const todoref = firebase.database().ref(`Linksdata/Akash/CollectionName`).child(deleteid);
    todoref.remove()
    toast("item is Removed")
    window.location.reload()
   

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>WorkSpace</title>
        <meta name="description" content="LinkData Manages your whole Links and Workspace" />
        <link rel="icon" href="icons/icon-512.png" />
        <meta name="theme-color" content="#007fff"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="red" />
    <meta name="apple-mobile-web-app-status-bar-style" content="red-translucent"  />
      </Head>



      <Modal
        open={openmodel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ mt: 2 }} id="modal-modal-title" variant="h6" component="h1">
            Are You Sure About This ?
          </Typography>
          <Typography id="modal-modal-description" variant="h7" component="h4" sx={{ mt: 2 }}>
            The deleted Collection can not be recovered After Delete
          </Typography>

                <br />
      <Tooltip title="Add New Collection">
           <Button className='deletee' onClick={Delete} variant="outlined" startIcon={<DeleteIcon />}>
                Delete 
            </Button>
      </Tooltip>
        </Box>
      </Modal>



        <Nav />
        {isform && 
<div className='addnew'>
<Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Collection Name
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          onChange={(e)=> settitle(e.target.value) }
          startAdornment={
            <InputAdornment position="start">
              <DriveFileRenameOutlineIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <br />
      <TextField
        id="input-with-icon-textfield"
        label="Image Link"
        onChange={(e)=> setimage(e.target.value) }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhotoCamera />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />

      <br />
  
             <LoadingButton
        onClick={AddLink}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Submit
      </LoadingButton>
    </Box>
  </div>
}
        <div className="block">


          
          <div className="left">
          <div className="LeftMenu" style={{backgroundColor:isTheme ? "#011229c9" : "white" , color:isTheme ? "white" : "black" }}>
          <div className='Add'>
            <img src='https://static.vecteezy.com/system/resources/previews/000/119/371/original/brown-flat-workspace-vector-illustration.jpg'  />
            
      <Tooltip title="Add New Collection">
           <Button onClick={AddNew} variant="outlined" startIcon={<AddIcon />}>
                Add New Collection
            </Button>
      </Tooltip>
          </div>
          <div className='allflex'>
          {All_Collection ? All_Collection.map((data , key)=>

<div className='ALl_coll' key={key} id={data.Name} onClick={()=>openall(data.Name , data.id)}>
<img src={data.Image} />
<h1>{data.Name}</h1>
</div>

) : ( <> </>)}
</div>
        </div>
          </div>

          <div className="right" style={{backgroundColor:isTheme ? "#011229c9" : "white" , color:isTheme ? "white" : "black" }}>
         
      


          <div className='alllex'>
            <div className='add'>

          <Tooltip title="Add New Collection">
           <Button onClick={AddNew}  variant="outlined" startIcon={<AddIcon />}>
                Add New 
            </Button>
      </Tooltip>
            </div>


               

          {All_Collection ? All_Collection.map((data , key)=>
<>
<div className='ALl_colll' key={key} id={data.Name} onClick={()=>openall(data.Name)}>
<img src={data.Image} />
<h1>{data.Name}</h1>
</div>

      </>
) : ( <> </>)}
</div>



             { Alldata && 
             <>
               <div className='main_title'>
               <img src={Alldata.Image} alt={Alldata.Name}/>
               <h1>{Alldata.Name}</h1>
               <div className='delete'>

<Tooltip title="Add New Collection">
<IconButton onClick={()=> handleOpen()} aria-label="fingerprint" style={{ color:"red"  }}>
                <DeleteIcon className="svg_icons" />
            </IconButton>
</Tooltip>
  </div>
               </div>
        </>
             
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


    
    </div>
  )
}
