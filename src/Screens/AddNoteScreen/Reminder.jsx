import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ICONS } from "../../Constants/iconConstants";
import { useReduxSelector } from "../Redux/Store/store";
import { getThemeColors } from "../../Assets/Colors/themeColors";

function Reminder () {
    const theme = useReduxSelector(state=>state.user.theme)
    const colors= getThemeColors(theme);
    return (
        <View
        style={{ flex:1,justifyContent:"center", alignItems:"flex-end", paddingRight:15}}
        >
        <TouchableOpacity 
        >
          {ICONS.REMINDER(25,25, colors.HEADERTITLE)}
        
        </TouchableOpacity>
        </View>
    )
}

export default Reminder;



// import { useState, useEffect, useCallback } from 'react';
// import { Platform } from 'react-native';
// import RNCalendarEvents from 'react-native-calendar-events';
// import moment from 'moment';
// import _ from 'lodash';

// const MY_CALENDAR = 'MY_CALENDAR';

// const useReminderService = () => {
//   const [hasAccess, setHasAccess] = useState(false);
//   const [calendarId, setCalendarId] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const fulfilled = await RNCalendarEvents.requestPermissions(false);
//         if (fulfilled === 'authorized' || fulfilled === 'undetermined') {
//           setHasAccess(true);
//           const { calendar, googleCal } = await getCalendar(MY_CALENDAR);
//           if (!calendar) {
//             const newCalendar = {
//               title: MY_CALENDAR,
//               color: '#666',
//               entityType: 'event',
//               ...Platform.OS === 'android' && {
//                 name: 'Custom Events',
//                 accessLevel: 'owner',
//                 ownerAccount: googleCal ? googleCal.source : 'default',
//                 source: {
//                   name: googleCal ? googleCal.source : 'App Name',
//                   type: "com.package_name",
//                 },
//               },
//             };
//             try {
//               const createdCalendar = await RNCalendarEvents.saveCalendar(newCalendar);
//               setCalendarId(createdCalendar.id);
//               console.log('Calendar created', createdCalendar);
//             } catch (error) {
//               console.error(error);
//             }
//           } else {
//             setCalendarId(calendar.id);
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     init();
//   }, []);

//   const getCalendar = useCallback(async (name) => {
//     try {
//       const calendars = await RNCalendarEvents.findCalendars();
//       const calendar = _.find(calendars, cal => cal.title === name);
//       const googleCal = Platform.OS === 'android' ? _.find(calendars, cal => cal.type === 'com.google') : null;
//       return { calendar, googleCal };
//     } catch (error) {
//       throw error;
//     }
//   }, []);

//   const addEvent = useCallback(async (data) => {
//     try {
//       const { calendar } = await getCalendar(MY_CALENDAR);
//       if (!calendar) throw new Error(`${MY_CALENDAR} does not exist`);

//       const { title, note, startDate, endDate } = data;
//       const event = await RNCalendarEvents.saveEvent(title, {
//         title,
//         notes: note,
//         description: note,
//         startDate,
//         endDate,
//         calendarId: calendar.id,
//         alarms: [{ date: startDate }, { date: endDate }],
//       });
//       console.log('Event created', event);
//       return event;
//     } catch (error) {
//       throw error;
//     }
//   }, [getCalendar]);

//   const getEvents = useCallback(async (startDate, endDate) => {
//     try {
//       const { calendar } = await getCalendar(MY_CALENDAR);
//       const events = await RNCalendarEvents.fetchAllEvents(startDate, endDate, [calendar.id]);
//       return _.orderBy(events, event => moment(event.startDate));
//     } catch (error) {
//       throw error;
//     }
//   }, [getCalendar]);

//   const deleteCalendars = useCallback(async () => {
//     try {
//       const calendars = await RNCalendarEvents.findCalendars();
//       const customCalendars = _.filter(calendars, cal => cal.title === MY_CALENDAR);
//       await Promise.all(customCalendars.map(cal => RNCalendarEvents.removeCalendar(cal.id)));
//       return true;
//     } catch (error) {
//       throw error;
//     }
//   }, []);

//   return {
//     hasAccess,
//     calendarId,
//     addEvent,
//     getEvents,
//     deleteCalendars,
//   };
// };

// export default useReminderService;
