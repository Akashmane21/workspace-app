import React, { Component , useState , useEffect } from "react";
import WeekView from "./weekView";
import {CalendarEventHandler} from "./calendarEventHandler";
import firebase from '../../db/firebase'
import { useCounter } from "../../Context/Context";


function GoogleCalendar() {
  const [events, setevents] = useState({})
  const { uid} =useCounter()

  
  useEffect(() => {

    const links = firebase
    .database()
    .ref(`Linksdata/${uid}/Calender/Events`);
  links.on("value", (snapshot) => {
    const todoList = [];
    const todos = snapshot.val();
     console.log(todos , uid);
    if(todos!=null){

      setevents(JSON.parse(todos.Data))
    }
  });
  
  }, [])
  
 const addNewEvent = async(event) => {
    event = {
      ...event,
      id: CalendarEventHandler.generateId(event),
    };

    setevents(CalendarEventHandler.add(events, event , uid))
    
  };

 
  const updateEvent = async(eventId, updatedEvent) => {
    console.log(eventId ,updatedEvent );
   

    setevents( CalendarEventHandler.update(
            eventId,
            updatedEvent,
            events,
            uid
          ))
  };

  const deleteEvent = async(eventId) => {
 const links = firebase
    .database()
    .ref(`Linksdata/${uid}/Calender/Events`);
  links.on("value", (snapshot) => {
    const todoList = [];
    const todos = snapshot.val();
    console.log( JSON.parse(todos.Data));
    setevents(JSON.parse(todos.Data))
  });
    setevents(CalendarEventHandler.delete(eventId, events , uid))
  };

    return (
      <>
    <WeekView
       events={events}
       onNewEvent={addNewEvent}
       onEventUpdate={updateEvent}
       onEventDelete={deleteEvent}
     /> 
     
      </>
    );
  
}

export  default GoogleCalendar;
