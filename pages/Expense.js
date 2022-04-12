import React from "react";
import Head from "next/head";
import Nav from "../Comps/Nav";
import styles from "../styles/Home.module.scss";
import { useCounter } from "../Context/Context";
import firebase from "../db/firebase";
import { useEffect, useState , Fragment } from "react";
import { useRouter } from "next/router";

import Workspace from "../Comps/Right_blocks/WorkSpace";
import LeftMenu from "../Comps/LeftMenu";
import Header from "../Comps/Header";
import Estyles from "../styles/Expense.module.scss";
import moment from 'moment'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

export default function Expense() {
  const [Sort, setSort] = React.useState('date');
  const [TodayDate, setTodayDate] = useState(new Date())
  const handleChange = (event) => {
    setSort(event.target.value);
    const time={
      "time":TodayDate
    }
    console.log(time.time.getFullYear());
  };
  const [value, setValue] = useState([null, null]);

  const router = useRouter();

  Date.prototype.addDay = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    setTodayDate(date);
}


function GFG_Fun() {
  var startDate = new Date();

  var endDate = startDate.addDay(10); 
}


  return (
    <div className={styles.container}>
      <Head>
        <title>Expense Tracker</title>
        <meta
          name="description"
          content="LinkData Manages your whole Links and Workspace"
        />
      </Head>

      <div className="block">
        <div className="left">
          <LeftMenu active="Expense" />
        </div>

        <div className="right">
          <Header />
        
        <div className="expenseblock">
          <div className={Estyles.expense}>


          <div className={Estyles.expense_title} >
          <div className={Estyles.icon}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/7014/7014960.png"
                alt=""
                height="80px"
              />
            </div>
            <div>
            <h1>Expense </h1>
            <h2>Tracker</h2>
            </div>
          </div>
         
            <div className={Estyles.spend}>
              <h2>
                You've spent{" "}
                <img
                  src="/rupee.svg"
                  alt=""
                  style={{ position: "relative", top: 5 }}
                />{" "}
                0,00 in a total of 0 expenses
              </h2>
            </div>


          </div>



          <div className={Estyles.flex}>
              <input type="text" className={Estyles.input} placeholder="Search for expenses.." /> 
                <InputLabel id="demo-simple-select-standard-label">
                  Sort by
              <div className={Estyles.dateblock}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={Sort}
                  onChange={handleChange}
                  label="Sort by"
                  style={{ height:"42px" }}
                  >
                  <MenuItem value={'date'}>Date</MenuItem>
                  <MenuItem value={'Amount'}>Amount</MenuItem>
                </Select>
              </FormControl> 
              </div>
                  </InputLabel>

              <InputLabel id="demo-simple-select-standard-label">
              Filter by date:
          <div className={Estyles.dateblock}>
              <LocalizationProvider dateAdapter={AdapterDateFns} >
              <DateRangePicker
              
              startText="Start-Date"
              endText="End-Date"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                console.log(newValue)
                }}
                renderInput={(startProps, endProps) => (
                  <Fragment  >
                    <TextField className={Estyles.date} placeholder="Start-Date" {...startProps} variant='standard' />
                    <Box sx={{ mx: 1 }}> to </Box>
                    <TextField className={Estyles.date} placeholder="End-Date" {...endProps} variant='standard' />
                  </Fragment>
                )}
                />
            </LocalizationProvider>
            </div>


                </InputLabel>
            {/* </div> */}
            {/* </div> */}
           
           
          </div>


          <div className={Estyles.block}>
            <h2>{TodayDate.toString()}</h2>
            <h2>{value.toString()}</h2>
            

          </div>


          </div>
        </div>
      </div>
    </div>
  );
}
