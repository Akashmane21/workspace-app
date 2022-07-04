import React , {useState}from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
  // FLoating button
  
import SendIcon from '@mui/icons-material/Send';
  import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// FOrm control
import LoadingButton from '@mui/lab/LoadingButton';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import firebase from '../db/firebase';
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useCounter } from "../Context/Context";

import { Empty } from 'antd';


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



export default function Links({AllTodo , Name}) {
    console.log(AllTodo);
    const { uid} =useCounter()

    const [isform, setisform] = useState(false)
    const [loading, setLoading] = useState(false);
    const [title, settitle] = useState('')
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  



   

     async  function Delete(id){
        
        const todoref = firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Todos`).child(id);
        todoref.remove()
        toast("item is Removed")
       }

      async function AddTask(){
        
        setLoading(true);
        const data={
            "Task":title,
            "Complete":false,
        }
    
           
            const main = await firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Todos`);
           
            main.push(data)
      
          
        toast("Task Added ")
          setLoading(false);
          setOpen(false)
       }

    

  return (
    <div  className='All_block' >

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='form'>
          <h2>Add Task :</h2>
            <TextField
                    id="input-with-icon-textfield"
                    label="Add Task"
                    onChange={(e)=> settitle(e.target.value) }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AddTaskRoundedIcon />
                        </InputAdornment>
                      ),
                    }}
                  
                  />
              <br />
              <br />
              <div className='btnflex'>

    <Button className='deletee' onClick={()=> setOpen(false)} variant="outlined" endIcon={<CloseRoundedIcon />}>
                Cancel 
            </Button>
                        <LoadingButton
                    onClick={AddTask}
                    endIcon={<SendIcon />}
                    loading={loading}
                    loadingPosition="end"
                    variant="outlined"
                  >
                    Sumbit
                  </LoadingButton>
                  </div>
        </div>
        </Box>
      </Modal>




      <div className='card_title'>
<h2 style={{ paddingLeft:10 }}> All TO-DO's</h2>
{/* <TextField
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
   placeholder='Search' variant='standard' /> */}

<Tooltip title="Add New Link">
      <Fab  className='Addme' variant="extended" onClick={()=>  setOpen(true)}  size="small" color="primary" aria-label="add">
        <AddIcon sx={{ fontSize:20  }} />
       
      </Fab>
      </Tooltip>
</div>

    <div className='AllLinks'>

  
  {AllTodo.length!=0 ? AllTodo.map((data , key)=>
    <div key={key} className={data.Complete ? 'links true' : 'links false'}>
        <div className='icons' >
        <Tooltip title="Edit Task">
        <Checkbox
         icon={<RadioButtonUncheckedIcon />}
         checkedIcon={<CheckCircleIcon style={{ color:"blue"  }} />}
      checked={data.Complete}
      onChange={(e) => 
        {
         setChecked(e.target.checked);        
            const todoref = firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Todos/`).child(data.id);
            todoref.update({
                "Complete":!data.Complete,
            })
        }
}
      inputProps={{ 'aria-label': 'controlled' }}
    />
    </Tooltip>
            <Tooltip title="Delete Task">

            <IconButton onClick={()=> Delete(data.id)} aria-label="fingerprint" style={{ color:"red"  }}>
                <DeleteIcon className="svg_icons" />
            </IconButton>
            </Tooltip>
         </div>

        <h1 class='task'>{data.Task}</h1>
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
