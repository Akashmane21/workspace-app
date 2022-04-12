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
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
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




function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};



export default function Files({AllFiles , Name}) {
    console.log(AllFiles);
    const { uid} =useCounter()

    var ImgName, ImgUrl ;
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    //   const [Filetype21, setFiletype21] = useState(" ")
      var files = [];
    const [isform, setisform] = useState(false)
    const [title, settitle] = useState('')
    const [Image, setImage] = useState('')
    const [Type, setType] = useState('File')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  


    function copyText(Note){
        navigator.clipboard.writeText(Note);
        toast("Coppied Successfully !")
       }



     async  function Delete(id){
        
        const todoref = firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Files`).child(id);
        todoref.remove()
        toast("item is Removed")
       }
     

      async function dd(){
        setLoading(true);

        if(Type=='Image'){

            const data={
                "Name":title,
                "Image":Image,
                "Type":Type
            }
                const main = await firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Files`);
                main.push(data)
          

         
        }
        else{
            const data={
                "Name":title,
                "Data":Image,
                "Type":Type
            }
                const main = await firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Files`);
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




const [File, setFile] = useState('')       

  const Chooseme = (e) => {
 
   
    files = e.target.files;
    localStorage.setItem("file",JSON.stringify(files))
   console.log(files[0]);
   const ff = JSON.stringify(files[0])
   setFile(ff)

    var reader = new FileReader();
    reader.onload = function () {
      // document.getElementById("img").src = reader.result;
      console.log(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };



  

  const AddFile = async () => {
    setLoading(true);
    
    var x = document.getElementById("fileInput");
  var txt = "";
  // console.log(x.files[0]);
  console.log(x.files[0].name);

  
    var uploadTask = firebase
      .storage()
      .ref("Image/" + x.files[0].name )
      .put(x.files[0]);

    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress)
       
      },

      // --------Error Handling-------------------------------

      function (err) {
        alert("Error to Saving the Image");
      },

      // ------------Submit image into Database---------------
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
            console.log(url);
          ImgUrl = url;


     if(Type=='Image'){

         const data={
             "Name":title,
             "Image":ImgUrl,
             "Type":Type
         }
             const main =  firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Files`);
             main.push(data)
       

      
     }
     else{
         const data={
             "Name":title,
             "Data":ImgUrl,
             "Type":Type
         }
             const main =  firebase.database().ref(`Linksdata/${uid}/All_Coll/${Name}/Files`);
             main.push(data)
       
             
         }
         toast("Data Inserted Successfully")
          setLoading(false);
          setProgress(0)
          setOpen(false)


        });
      }
    );
  };




  return (
    < div className='All_block'>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='form'>
          <h2>Add File :</h2>
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

                      


                        <br />  <br />

                            <input className="completebtn" id="fileInput" type="file" onChange={Chooseme} />
                          
                            <br />  <br />



                        <Select
                          labelId="demo-simple-select-filled-label"
                          id="demo-simple-select-filled"
                          value={Type}
                          style={{width:210}}
                          onChange={(e)=> setType(e.target.value)}
                        >
                          
                          <MenuItem value={'File'}>File</MenuItem>
                          <MenuItem value={'Image'}>Image</MenuItem>
                        </Select>
                      
                        <br />  
                        <br />  
                        <div className='btnflex'>

    <Button className='deletee' onClick={()=> setOpen(false)} variant="outlined" endIcon={<CloseRoundedIcon />}>
                Cancel 
            </Button>
                            <LoadingButton
                        onClick={AddFile}
                        endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="outlined"
                      >
                        Send
                      </LoadingButton>
                      </div>
                      <CircularProgressWithLabel value={progress} />
        </div>
        </Box>
      </Modal>





      <div className='card_title'>
<h2 style={{ paddingLeft:10 }}> All File's</h2>
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
        <AddIcon sx={{fontSize:20}}  />
        Add File
      </Fab>
      </Tooltip>
</div>

    <div className='AllLinks allfiles'>

  
    {AllFiles.length!=0 ? AllFiles.map((data , key)=>
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
    </div >
  )
}
