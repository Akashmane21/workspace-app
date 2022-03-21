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
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid gray',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};



export default function Notes({AllNotes , Name}) {
    console.log(Name);
    const [isform, setisform] = useState(false)
    const [loading, setLoading] = useState(false);
    const [title, settitle] = useState('')
    const [Note, setNote] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  

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
          setOpen(false)
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
    <div >

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='form'>
          <h2>Add Note :</h2>
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
      
      />
      <br />
      <br />
     

<TextareaAutosize
      aria-label="empty textarea"
      onChange={(e)=> setNote(e.target.value) }
      placeholder="Enter Note Here"
      style={{ width: 210 , height:100 , borderRadius:4 , padding:10 , borderColor:'gray' }}

    />
    <br />
    <br />
      
       


<div className='btnflex'>

    <Button className='deletee' onClick={()=> setOpen(false)} variant="outlined" endIcon={<CloseRoundedIcon />}>
                Cancel 
            </Button>
             <LoadingButton
        onClick={AddNote}
        endIcon={<SendIcon />}
        loading={loading}
        loadingPosition="end"
        variant="outlined"
      >
        Submit
      </LoadingButton>
</div>
      
    
</div>
        </Box>
      </Modal>
  


<div style={{ "textAlign":"end"}}>

<Tooltip title="Add New Link">
      <Fab className='Addme' variant="extended" onClick={()=>  setOpen(true)}  size="small" color="primary" aria-label="add">
        <AddIcon sx={{ mr: 1 }} />
        Add Note
      </Fab>
      </Tooltip>
</div>

    <div className='AllLinks'>

  
    {AllNotes.length!=0 ? AllNotes.map((data , key)=>
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
    </div>
  )
}
