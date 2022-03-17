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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';




export default function Files({AllFiles , Name}) {
    console.log(AllFiles);
    const [isform, setisform] = useState(false)
    const [loading, setLoading] = useState(false);
    const [title, settitle] = useState('')
    const [Image, setImage] = useState('')
    const [Type, setType] = useState('File')


    function copyText(Note){
        navigator.clipboard.writeText(Note);
        toast("Coppied Successfully !")
       }

     async  function Delete(id){
        
        const todoref = firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Notes`).child(id);
        todoref.remove()
        toast("item is Removed")
       }
     

      async function AddFile(){
        setLoading(true);

        if(Type=='Image'){

            const data={
                "Name":title,
                "Image":Image,
                "Type":Type
            }
                const main = await firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Files`);
                main.push(data)
          

         
        }
        else{
            const data={
                "Name":title,
                "Data":Image,
                "Type":Type
            }
                const main = await firebase.database().ref(`Linksdata/Akash/All_Coll/${Name}/Files`);
                main.push(data)
          
                
            }
            toast("Data Inserted Successfully")
        setLoading(false);
        setisform(!isform)
       }

      async function Download(data , Name){
 



        const image = await fetch(data);

        //Split image name
        const nameSplit=data.split("/");
        const  duplicateName=nameSplit.pop();
       
        const imageBlog = await image.blob()
        const imageURL = URL.createObjectURL(imageBlog)
        const link = document.createElement('a')
        link.href = imageURL;
        link.download = ""+duplicateName+"";
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)  
        toast("Image Download SuccessFully")

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
      


     <InputLabel htmlFor="input-with-icon-adornment">
          File Link
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          onChange={(e)=> setImage(e.target.value) }
          startAdornment={
            <InputAdornment position="start">
              <AddLinkIcon />
            </InputAdornment>
          }
        />

      </FormControl>




<InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={Type}
          onChange={(e)=> setType(e.target.value)}
        >
          
          <MenuItem value={'File'}>File</MenuItem>
          <MenuItem value={'Image'}>Image</MenuItem>
        </Select>
      
  
             <LoadingButton
        onClick={AddFile}
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

  
    {AllFiles ? AllFiles.map((data , key)=>
    <div key={key} className='links'>
        <div className='icons'>
        <Tooltip title="Download as File">
        <IconButton onClick={()=> Download(data.Image , data.Name)} color="primary" aria-label="add to shopping cart" style={{ color:"gray" }}>
                <CloudDownloadRoundedIcon className="svg_icons"  />
            </IconButton>
            </Tooltip>
        <Tooltip title="Go to file">
            
        <a href={data.Type!='Image' ? data.Data : data.Image}>
        <IconButton aria-label="fingerprint" style={{ color:"green"  }}>
                <CallMissedOutgoingOutlinedIcon className="svg_icons" />
            </IconButton>
            </a>
            </Tooltip>
            <Tooltip title="Delete the Note">
            <IconButton onClick={()=> Delete(data.id)} aria-label="fingerprint" style={{ color:"red"  }}>
                <DeleteIcon className="svg_icons" />
            </IconButton>
            </Tooltip>
         </div>

        {data.Type=='Image' ?
        
        <img src={data.Image} />
        :
        (
            <a href={data.Data}>

                <img src='https://static.vecteezy.com/system/resources/previews/000/363/697/original/doc-vector-icon.jpg' />
            </a>
        )
        }
        <h1 >{data.Name}</h1>
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
