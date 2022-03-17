import React , {useState}from 'react'
import IconButton from '@mui/material/IconButton';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CallMissedOutgoingOutlinedIcon from '@mui/icons-material/CallMissedOutgoingOutlined';
import CodeIcon from '@mui/icons-material/Code';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import firebase from '../db/firebase';
import TextareaAutosize from '@mui/material/TextareaAutosize';




export default function Notes({AllNotes , Name}) {
    console.log(Name);
    const [isform, setisform] = useState(false)
    const [loading, setLoading] = useState(false);
    const [title, settitle] = useState('')
    const [Note, setNote] = useState('')


    function copyText(Note){
        navigator.clipboard.writeText(Note);
        toast("Coppied Successfully !")
       }

     async  function Delete(id){
        
        const todoref = firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Notes`).child(id);
        todoref.remove()
        toast("item is Removed")
       }
     

      async function AddNote(){
        setLoading(true);
        const data={
            "Title":title,
            "Note":Note
        }
    
           
            const main = await firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Notes`);
           
            main.push(data)
      
          
        toast("Data Inserted")
          setLoading(false);
          setisform(!isform)
       }

       function Download(data , Name){
       
        var c = document.createElement("a");
        c.download = `${Name}.txt`;

        var t = new Blob([data], {
        type: "text/plain"
        });
        c.href = window.URL.createObjectURL(t);
        c.click();
        toast("Download Successfully")
       }



  return (
    <>


{isform && 
<div className='form'>
<Box sx={{ '& > :not(style)': { m: 1 } }}>
<TextField
        id="input-with-icon-textfield"
        label="Title"
        onChange={(e)=> settitle(e.target.value) }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CodeIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <FormControl variant="standard">

<TextareaAutosize
      aria-label="empty textarea"
      onChange={(e)=> setNote(e.target.value) }
      placeholder="Enter Note Here"
      style={{ width: 200 }}
    />
        {/* <InputLabel htmlFor="input-with-icon-adornment">
          Write Note
        </InputLabel> */}
       


      </FormControl>
      
  
             <LoadingButton
        onClick={AddNote}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
    </Box>
</div>
}


<div style={{ "textAlign":"end"}}>

<Tooltip title="Add New Link">
      <Fab variant="extended" onClick={()=>  setisform(!isform)}  size="small" color="primary" aria-label="add">
        <AddIcon sx={{ mr: 1 }} />
        Add New
      </Fab>
      </Tooltip>
</div>

    <div className='AllLinks'>

  
    {AllNotes ? AllNotes.map((data , key)=>
    <div key={key} className='links'>
        <div className='icons'>
        <Tooltip title="DOwnload as File">
        <IconButton onClick={()=> Download(data.Note , data.Title)} color="primary" aria-label="add to shopping cart" style={{ color:"gray" }}>
                <CloudDownloadRoundedIcon className="svg_icons"  />
            </IconButton>
            </Tooltip>
        <Tooltip title="Copy the Note">
        <IconButton onClick={()=> copyText(data.Note)} color="primary" aria-label="add to shopping cart" style={{ color:"green" }}>
                <CopyAllIcon className="svg_icons"  />
            </IconButton>
            </Tooltip>
            <Tooltip title="Delete the Note">
            <IconButton onClick={()=> Delete(data.id)} aria-label="fingerprint" style={{ color:"red"  }}>
                <DeleteIcon className="svg_icons" />
            </IconButton>
            </Tooltip>
         </div>

        <h2>{data.Note}</h2>
        <h1 >{data.Title}</h1>
        </div>
    ) : (
        <h1>No Links here</h1>
    ) }







      </div>


      <ToastContainer
             position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        {/* Same as */}
<ToastContainer />
    </>
  )
}
