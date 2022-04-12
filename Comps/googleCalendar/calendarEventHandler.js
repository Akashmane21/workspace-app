import moment from 'moment';
import firebase from '../../db/firebase'
import { useCounter } from "../../Context/Context";

const CalendarEventHandler = (function () {
  
  /**
   * Add event after adding meta data in the event
   * @param {arr} allEvent - Array of all the events
   * @param {Object} newEvent - Event object of the new event
   * @returns {Object} allEvents - A new object reference for all events
  */
 async function addEvent (allEvents, newEvent , uid) {
    const time = moment (newEvent.start).hours ();
    const eventWithMeatInfo = {
      ...newEvent,
      startWeek: moment (newEvent.start).week (),
      endWeek: moment (newEvent.end).week (),
    };
    if (allEvents[time]) {
      allEvents[time].push (eventWithMeatInfo);
    } else {
      allEvents[time] = [eventWithMeatInfo];
    }

    const main = await firebase.database().ref(`Linksdata/${uid}/Calender/Events`);
    main.set({"Data" :JSON.stringify({...allEvents})})

    return {...allEvents};
  }

  /**
   * Generate unique id for an event
   * @param {timeStamp} start - Start timestamp of the event
   * @param {timeStamp} end - End timeStamp of the event
   * @params {string} title - Title of the event
   * @returns {string} id - Unique id
  */
  function generateUniqueId({start, title, end}) {
    return start + title + end;
  }

  /**
   * Deletes event from the list
   * @param {string} eventId - Id of the event to be deleted
   * @param {arr} allEvents - Array of all the events
   * @returns {Object} allEvents - A new object reference for all events
  */
 async function deleteEvent (eventId, allEvents , uid) {
    Object.keys (allEvents).forEach (time => {
      allEvents[time] = allEvents[time].filter (event => event.id !== eventId);
    });
    const main = await firebase.database().ref(`Linksdata/${uid}/Calender/Events`);
    main.set({"Data" :JSON.stringify({...allEvents})})

    return {...allEvents};
  }

  /**
   * Updates an event from the list
   * @param {string} eventId - Id of the event to be deleted
   * @param {Object} updatedEvent - Event objects with the updated data
   * @param {arr} allEvents - Array of all the events
   * @returns {Object} allEvents - A new object reference for all events
  */
 async function updateEvent (eventId, updatedEvent, allEvents , uid) {
    Object.keys (allEvents).forEach (time => {
      allEvents[time] = allEvents[time].map (
        event => (event.id === eventId ? {...event, ...updatedEvent} : event)
      );
    });
     await firebase.database().ref(`Linksdata/${uid}/Calender/Events`)
    .set({"Data" :JSON.stringify({...allEvents})})

    return {...allEvents};
  }

  return {
    add: addEvent,
    delete: deleteEvent,
    update: updateEvent,
    generateId: generateUniqueId,
  };
}) ();

export  {CalendarEventHandler};
