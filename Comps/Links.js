import React , {useState}from 'react'
import IconButton from '@mui/material/IconButton';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteIcon from '@mui/icons-material/Delete';
  // FLoating button
  
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
  import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// FOrm control
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
import firebase from '../db/firebase';

export default function Links({AllLinks , Name}) {
    console.log(Name);
    const [isform, setisform] = useState(false)
    const [loading, setLoading] = useState(false);
    const [title, settitle] = useState('')
    const [link, setlink] = useState('')


    function copyText(link){
        navigator.clipboard.writeText(link);
        toast("Coppied Successfully !")
       }

     async  function Delete(id){
        
        const todoref = firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Links`).child(id);
        todoref.remove()
        toast("item is Removed")
       }

      async function AddLink(){
        setLoading(true);
        const data={
            "Name":title,
            "Link":link
        }
    
           
            const main = await firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Links`);
           
            main.push(data)
      
          
        toast("Data Inserted")
          setLoading(false);
          setisform(!isform)
       }



  return (
    <>


{isform && 
<div className='form'>
<Box sx={{ '& > :not(style)': { m: 1 } }}>
      <FormControl variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Insert Link
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          onChange={(e)=> setlink(e.target.value) }
          startAdornment={
            <InputAdornment position="start">
              <AddLinkIcon />
            </InputAdornment>
          }
        />
      </FormControl>
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
  
             <LoadingButton
        onClick={AddLink}
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
        Add Link
      </Fab>
      </Tooltip>
</div>

    <div className='AllLinks'>

  
    {AllLinks.length!=0 ? AllLinks.map((data , key)=>
    <div key={key} className='links'>
        <div className='icons'>
        <Tooltip title="Visit the link">

          <a href={data.Link}>
        <IconButton aria-label="fingerprint" style={{ color:"green"  }}>
                <CallMissedOutgoingOutlinedIcon className="svg_icons" />
            </IconButton>
            </a>
            </Tooltip>
            <Tooltip title="Copy Link">

        <IconButton onClick={()=> copyText(data.Link)} color="primary" aria-label="add to shopping cart" style={{ color:"green" }}>
                <CopyAllIcon className="svg_icons"  />
            </IconButton>
            </Tooltip>

            <Tooltip title="Delete Link">

            <IconButton onClick={()=> Delete(data.id)} aria-label="fingerprint" style={{ color:"red"  }}>
                <DeleteIcon className="svg_icons" />
            </IconButton>
            </Tooltip>
         </div>

        <h2>{data.Link}</h2>
        <h1 >{data.Name}</h1>
        </div>
    ) : (
      <div className='nodata'>

<img  src='https://image.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg' />
    </div>
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
