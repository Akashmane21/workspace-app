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
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Empty } from 'antd';
import { useCounter } from "../Context/Context";


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



export default function Links({AllLinks , Name}) {
    console.log(Name);
    const { uid} =useCounter()
    const [isform, setisform] = useState(false)
    const [loading, setLoading] = useState(false);
    const [title, settitle] = useState('')
    const [link, setlink] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  


    function copyText(link){
        navigator.clipboard.writeText(link);
        toast("Coppied Successfully !")
       }

     async  function Delete(id){
        
        const todoref = firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Links`).child(id);
        todoref.remove()
        toast("item is Removed")
       }

      async function AddLink(){
        setLoading(true);
        
        const data={
            "Name":title,
            "Link":link
        }
    
           
            const main = await firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Links`);
           
            main.push(data)
      
          
        toast("Data Inserted")
          setLoading(false);
          setOpen(false)
       }



  return (
    <div className='All_block'>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='form'>
          <h2>Add Link :</h2>
          <TextField
                  id="input-with-icon-adornment"
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
                  <TextField
                    id="input-with-icon-adornment"
                    label="Link"
                    onChange={(e)=> setlink(e.target.value) }
                    InputProps={{
                    startAdornment:(
                      <InputAdornment position="start">
                        <AddLinkIcon />
                      </InputAdornment>
                    ),
                  }}
                  />
                  <br /><br />


                  <div className='btnflex'>

<Button className='deletee' onClick={()=> setOpen(false)} variant="outlined" endIcon={<CloseRoundedIcon />}>
            Cancel 
        </Button>
                      <LoadingButton
                  onClick={AddLink}
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



      <div className='card_title'>
<h2 style={{ paddingLeft:10 }}> All Link's</h2>
<TextField
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
   placeholder='Search' variant='standard' />

<Tooltip title="Add New Link">
      <Fab className='Addme' variant="extended" onClick={()=>  setOpen(true)}  size="small" color="primary" aria-label="add">
        <AddIcon sx={{ fontSize:20 }} />
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
        <Empty  />

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
