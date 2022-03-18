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

export default function Links({AllTodo , Name}) {
    console.log(AllTodo);
    const [isform, setisform] = useState(false)
    const [loading, setLoading] = useState(false);
    const [title, settitle] = useState('')
    const [checked, setChecked] = useState(false);



   

     async  function Delete(id){
        
        const todoref = firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Todos`).child(id);
        todoref.remove()
        toast("item is Removed")
       }

      async function AddTask(){
        setLoading(true);
        const data={
            "Task":title,
            "Complete":false,
        }
    
           
            const main = await firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Todos`);
           
            main.push(data)
      
          
        toast("Task Added ")
          setLoading(false);
          setisform(!isform)
       }

       const  handleChange = async (event , id) => {
     
      };

  return (
    <>


{isform && 
<div className='form'>
<Box sx={{ '& > :not(style)': { m: 1 } }}>
      
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
        variant="standard"
      />
  
             <LoadingButton
        onClick={AddTask}
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
        Add Task
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
        // alert(id)
        
            const todoref = firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Todos/`).child(data.id);
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
