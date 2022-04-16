import {Row, Col, Icon, Tooltip} from 'antd';
import React from 'react';
import {
  toolbar,
  toolbarDate,
  appTitle,
  alignRight,
  spacify,
  weekButtons,
} from '../styles';
import moment from 'moment';
import { Button } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function WeekToolbar (props) {
  const formattedDate = moment (props.startDate).format ('MMM YYYY');
  
  return (
    <>
   

    <div className="cal_header">
      <div className="title">
      <img src="https://cdn-icons-png.flaticon.com/512/2370/2370277.png" alt="" height="30px" />
         Calendar
      </div>
      <div className="weekbtns">
          <div className="flex">

        {/* <Tooltip placement="topLeft" title={moment ().format ('dddd, MMM D')}> */}
          <Button onClick={props.goToToday} variant='contained' className='btn' style={{color:"black" }}>Today</Button> <br /> <br />
        {/* </Tooltip> */}

        

        <Tooltip placement="topLeft" title="Go to Next Week">
            <IconButton onClick={props.goToNextWeek}  aria-label="fingerprint" className='btn'>
                <ArrowForwardIosIcon className="svg_icons" />
            </IconButton>
        </Tooltip>

        <Tooltip placement="topLeft" title="Go to previous Week">
          <IconButton onClick={props.goToPreviousWeek}  aria-label="fingerprint" className='btn'>
                <ArrowBackIosIcon className="svg_icons" />
            </IconButton>
        </Tooltip>
        <h1> {formattedDate}</h1>


         

        </div>

      </div>
      
    </div>

         
        {/* <Button startIcon={<ArrowBackIosIcon className="svg_icons" />} 
       onClick={props.goToPreviousWeek}  variant='text' 
        style={{color:"black" }}>Prev</Button>  */}
  {/* <Button endIcon={<ArrowForwardIosIcon className="svg_icons" />} 
       onClick={props.goToNextWeek} variant='text' 
        style={{color:"black" }}>Next</Button>  */}

    </>
  );
}

