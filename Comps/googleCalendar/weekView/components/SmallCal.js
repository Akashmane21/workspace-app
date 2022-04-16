import React, { useState , useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import {message, Modal} from 'antd';
import firebase from '../../../../db/firebase';

export default function MyApp({isDash}) {
  const [value, onChange] = useState(new Date());
  const [Allrems, setAllrems] = useState([])
  const [visible, setvisible] = useState(false)
  const [Title, setTitle] = useState('')
  const [Des, setDes] = useState('')

  useEffect(() => {
  
    firebase.auth().onAuthStateChanged((User)=>{
      if(User)
      {
        firebase.database().ref(`Linksdata/${User.uid}/Reminders`)
        .on("value" , (snapshot)=>{
          const rems=snapshot.val()
          var list=[]
          for(let id in rems){
            list.push({id , ...rems[id]})

          }
          setAllrems(list)
        
        })
      }})

  }, [])
  

 async  function Submit(){
    
  
 await firebase.auth().onAuthStateChanged((User)=>{
    if(User)
    {
      console.log(User);
      const Data={
        Title:Title,
        Des:Des,
        Timestamp:moment(value).format('MMMM Do YYYY, h:mm:ss a'),
        uid:User.uid
      }
     firebase.database().ref(`Linksdata/${User.uid}/Reminders`).push(Data)
     .then(()=> message.success("Saved Successfully "))
     console.log(Data);
    }
  })
  }
  
  return (
    <div className='small_cal'>
       <Modal
        visible={visible}
        onOk={Submit}
        onCancel={()=> setvisible(false)}
        
        footer={[
          <Button key="back" style={{color:"orangered"}} onClick={()=> setvisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="submit" variant='outlined' onClick={Submit}>
            Add
          </Button>
        ]}
      >
              <NotificationsNoneIcon style={{color:"orangered" , backgroundColor:"#e724242e" , borderRadius:20 ,padding:3 }} /> 
        <h3>Add Reminder</h3>
        <h4>Set Reminder on {moment(value).format('MMMM Do YYYY, h:mm:ss a')} </h4> <br />
       <form action="">


        <TextField onChange={(e)=> setTitle(e.target.value)} label="Enter Title here" variant='standard' /> <br /> <br />
        <TextField onChange={(e)=> setDes(e.target.value)} label="Reminder for what ?" variant='standard' />
       </form>

      </Modal>

{isDash ? (
<></>
):(
  <>
        <div className="flex" style={{}}>

      <NotificationsNoneIcon style={{color:"orangered" , backgroundColor:"#e724242e" , borderRadius:20 ,padding:3 }} />  <h4>  Reminder Section</h4>
        </div>
        <hr />
      <Calendar onChange={onChange} value={value} />
      <div className="Small_cal_card">
        <h5>Plz Select the Date from above Calender And Add an Reminder . we will notify you to at right Time </h5>
      <Button onClick={()=> setvisible(true)} startIcon={<Add />}>Add Reminder</Button>
      </div>
      <br />
</>
)}
      <center>

      <h3>--- Your Reminders ---</h3>
      </center>

      {Allrems ? Allrems.map((data , key)=>
        <div className="rems_card" key={key}>
          <h5>{data.Timestamp}</h5>
          <hr />
          <h3>{data.Title}</h3>
          <h4>{data.Des}</h4>
        </div>
       ): (
        <h3>No Data Available</h3>
      )}

    </div>
  );
}