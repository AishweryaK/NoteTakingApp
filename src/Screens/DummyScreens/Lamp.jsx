// import React from "react";
// import { View, Text } from "react-native";
// function Lamp () {
//     return (
//         <View>
//             <Text>
//                 Lamp
//             </Text>

//         </View>
//     )
// }

// export default Lamp;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Button,
//   Text,
//   Platform,
// } from 'react-native';
// import RNCalendarEvents from 'react-native-calendar-events';


// const Lamp = () => {

//   const [eventTitle, setEventTitle] = useState('Gym Workout');
//   const [eventLocation, setEventLocation] = useState('New Delhi');
//   const [eventId, setEventId] = useState('');
//   const [calendars, setCalendars] = useState([]);
//   const [pickedCal, setPickedCal] = useState(null);

  
//   useEffect(() => {
//     async function loadCalendars() {
//       try {
//         const perms = await RNCalendarEvents.requestPermissions();
//         if (perms === 'authorized') {
//           const allCalendars = await RNCalendarEvents.findCalendars();
//           const primaryCal = allCalendars.find(
//             (cal) => cal.isPrimary && cal.allowsModifications
//           );
//           setCalendars(allCalendars);
//           setPickedCal(primaryCal);
//         } else {
//           console.log('Calendar permission denied.');
//         }
//       } catch (error) {
//         console.log('Error while fetching calendars:', error);
//       }
//     }

//     if (Platform.OS === 'android') {
//       loadCalendars();
//     }
//   }, []);

//   const createEvent = async () => {
//     try {
//       const savedEventId = await RNCalendarEvents.saveEvent(eventTitle, {
//         calendarId: Platform.OS === 'android' ? pickedCal?.id : undefined,
//         startDate: new Date().toISOString(),
//         endDate: new Date().toISOString(),
//         location: eventLocation,
//       });
  
//       setEventId(savedEventId);
//       alert('Event saved successfully.');
//     } catch (error) {
//       console.log('Error while saving event:', error);
//     }
//   };

  
//   const fetchEvent = async () => {
//   try {
//     const eventData = await RNCalendarEvents.findEventById(eventId);
//     console.log('Event Data:', eventData);
//   } catch (error) {
//     console.log('Error while fetching event:', error);
//   }
// };


//   return (
//     <View 
//     // style={styles.container}
//     >
//     <TextInput
//     //   style={styles.textInput}
//       placeholder="Enter Event Title"
//       value={eventTitle}
//       onChangeText={setEventTitle}
//     />
//     <TextInput
//     //   style={styles.textInput}
//       placeholder="Enter Event Location"
//       value={eventLocation}
//       onChangeText={setEventLocation}
//       multiline={true}
//       numberOfLines={2}
//     />
//     <Button title="Save Event" onPress={createEvent} />
//     <Button title="Fetch Event" onPress={fetchEvent} />
//   </View>
//   );
// };

// export default Lamp;


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Button,
//   Text,
//   Platform,
// } from 'react-native';
// import RNCalendarEvents from 'react-native-calendar-events';

// const Lamp = () => {
//   const [eventTitle, setEventTitle] = useState('Gym Workout');
//   const [eventLocation, setEventLocation] = useState('New Delhi');
//   const [eventId, setEventId] = useState('');
//   const [calendars, setCalendars] = useState([]);
//   const [pickedCal, setPickedCal] = useState(null);

//   useEffect(() => {
//     async function loadCalendars() {
//       try {
//         const perms = await RNCalendarEvents.requestPermissions();
//         if (perms === 'authorized') {
//           const allCalendars = await RNCalendarEvents.findCalendars();
//           const primaryCal = allCalendars.find(
//             (cal) => cal.isPrimary && cal.allowsModifications
//           );
//           setCalendars(allCalendars);
//           setPickedCal(primaryCal);
//         } else {
//           console.log('Calendar permission denied.');
//         }
//       } catch (error) {
//         console.log('Error while fetching calendars:', error);
//       }
//     }

//     if (Platform.OS === 'android') {
//       loadCalendars();
//     }
//   }, []);

//   const createEvent = async () => {
//     try {
//       const savedEventId = await RNCalendarEvents.saveEvent(eventTitle, {
//         calendarId: Platform.OS === 'android' ? pickedCal?.id : undefined,
//         startDate: new Date().toISOString(),
//         endDate: new Date().toISOString(),
//         location: eventLocation,
//       });

//       setEventId(savedEventId);
//       alert('Event saved successfully.');
//     } catch (error) {
//       console.log('Error while saving event:', error);
//     }
//   };

//   const fetchEvent = async () => {
//     try {
//       const eventData = await RNCalendarEvents.findEventById(eventId);
//       console.log('Event Data:', eventData);
//     } catch (error) {
//       console.log('Error while fetching event:', error);
//     }
//   };

//   return (
//     <View 
//     // style={styles.container}
//     >
//       <TextInput
//         //   style={styles.textInput}
//         placeholder="Enter Event Title"
//         value={eventTitle}
//         onChangeText={setEventTitle}
//       />
//       <TextInput
//         //   style={styles.textInput}
//         placeholder="Enter Event Location"
//         value={eventLocation}
//         onChangeText={setEventLocation}
//         multiline={true}
//         numberOfLines={2}
//       />
//       <Button title="Save Event" onPress={createEvent} />
//       <Button title="Fetch Event" onPress={fetchEvent} />
//     </View>
//   );
// };

// export default Lamp;

import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Platform,
  Alert,
} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';

const Lamp = () => {
  const [eventTitle, setEventTitle] = useState('Gym Workout');
  const [eventLocation, setEventLocation] = useState('New Delhi');
  const [eventId, setEventId] = useState('');
  const [calendars, setCalendars] = useState([]);
  const [pickedCal, setPickedCal] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

  const requestCalendarPermissions = async () => {
    try {
      const perms = await RNCalendarEvents.requestPermissions();
      setPermissionStatus(perms);
      if (perms === 'authorized') {
        loadCalendars();
      } else {
        Alert.alert('Permission Denied', 'Calendar permission denied.');
      }
    } catch (error) {
      console.log('Error requesting permissions:', error);
    }
  };

  const loadCalendars = async () => {
    try {
      const allCalendars = await RNCalendarEvents.findCalendars();
      const primaryCal = allCalendars.find(
        (cal) => cal.isPrimary && cal.allowsModifications
      );
      setCalendars(allCalendars);
      setPickedCal(primaryCal);
    } catch (error) {
      console.log('Error while fetching calendars:', error);
    }
  };

  const createEvent = async () => {
    let now = new Date();
let startDate = new Date(now.getTime() + 2 * 60 * 1000);
let endDate = new Date(now.getTime() + 4 * 60 * 1000);
startDate = startDate.toISOString();
endDate = endDate.toISOString();
    try {
      const savedEventId = await RNCalendarEvents.saveEvent(eventTitle, {
        calendarId: Platform.OS === 'android' ? pickedCal?.id : undefined,
        startDate: startDate,
        endDate: endDate,
        location: eventLocation,
      });

      setEventId(savedEventId);
      Alert.alert('Success', 'Event saved successfully.');
    } catch (error) {
      console.log('Error while saving event:', error);
    }
  };

  const fetchEvent = async () => {
    try {
      const eventData = await RNCalendarEvents.findEventById(eventId);
      console.log('Event Data:', eventData);
    } catch (error) {
      console.log('Error while fetching event:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter Event Title"
        value={eventTitle}
        onChangeText={setEventTitle}
      />
      <TextInput
        placeholder="Enter Event Location"
        value={eventLocation}
        onChangeText={setEventLocation}
        multiline={true}
        numberOfLines={2}
      />
      <Button title="Request Permission" onPress={requestCalendarPermissions} />
      <Button title="Save Event" onPress={createEvent} />
      <Button title="Fetch Event" onPress={fetchEvent} />
      {permissionStatus && (
        <Text>Permission Status: {permissionStatus}</Text>
      )}
    </View>
  );
};

export default Lamp;

// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, Alert } from 'react-native';
// import useReminderService from '../AddNoteScreen/Reminder';
// import moment from 'moment';

// const Lamp = () => {
//   const { hasAccess, calendarId, addEvent, getEvents, deleteCalendars } = useReminderService();
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     if (hasAccess) {
//       // Fetch events when the component mounts and when access is granted
//       fetchEvents();
//     }
//   }, [hasAccess]);

//   const fetchEvents = async () => {
//     try {
//       const startDate = moment().startOf('month').toISOString();
//       const endDate = moment().endOf('month').toISOString();
//       const events = await getEvents(startDate, endDate);
//       setEvents(events);
//     } catch (error) {
//       console.error('Failed to fetch events', error);
//     }
//   };

//   const handleAddEvent = async () => {
//     try {
//       const newEvent = {
//         title: 'New Event',
//         note: 'This is a new event',
//         startDate: moment().add(1, 'days').toISOString(),
//         endDate: moment().add(1, 'days').add(1, 'hours').toISOString(),
//       };
//       const event = await addEvent(newEvent);
//       Alert.alert('Event Created', `Event ID: ${event.id}`);
//       fetchEvents(); // Refresh events after adding a new one
//     } catch (error) {
//       console.error('Failed to add event', error);
//     }
//   };

//   const handleDeleteCalendars = async () => {
//     try {
//       await deleteCalendars();
//       Alert.alert('Calendars Deleted', 'All custom calendars have been deleted');
//       setEvents([]); // Clear events after deleting calendars
//     } catch (error) {
//       console.error('Failed to delete calendars', error);
//     }
//   };

//   return (
//     <View>
//       <Text>Calendar Access: {hasAccess ? 'Granted' : 'Denied'}</Text>
//       {calendarId && <Text>Calendar ID: {calendarId}</Text>}
//       <Button title="Add Event" onPress={handleAddEvent} disabled={!hasAccess || !calendarId} />
//       <Button title="Delete Calendars" onPress={handleDeleteCalendars} disabled={!hasAccess} />
//       <Text>Events:</Text>
//       {events.map((event, index) => (
//         <View key={index}>
//           <Text>{event.title}</Text>
//           <Text>{moment(event.startDate).format('YYYY-MM-DD HH:mm')}</Text>
//           <Text>{moment(event.endDate).format('YYYY-MM-DD HH:mm')}</Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default Lamp;


