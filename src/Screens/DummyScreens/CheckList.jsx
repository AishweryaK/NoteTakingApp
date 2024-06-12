import React from "react";
import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { useReduxSelector } from "../Redux/Store/store";
import { getThemeColors } from "../../Assets/Colors/themeColors";
import { FONT } from "../../Constants/fontConstants";

function CheckList () {
  const theme = useReduxSelector((state)=> state.user.theme)
  const colors = getThemeColors(theme);
    return (
        <View style={styles.view(colors)}>
            <Text style={styles.text(colors)}>
               New features coming soon!!! 
            </Text>
        </View>
    )
}

export default CheckList;

const styles = StyleSheet.create(
  {
    view : (colors) => ({
      flex:1, 
      backgroundColor:colors.BACKGROUND,
      justifyContent:"center", 
      alignItems:"center",
    }),
    text : (colors) => ({
      color:colors.HEADERTITLE,
      fontFamily:FONT.REGULAR,
      fontSize:18
    }),
  }
)









// import React from "react";
// import { View, Text, TouchableOpacity} from "react-native";
// import { APPCOLOR } from "../../Assets/Colors/appColors";
// import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

// function CheckList () {

//     // async function onDisplayNotification() {

//     //     await notifee.requestPermission()
    
        
//     //     const channelId = await notifee.createChannel({
//     //       id: 'default',
//     //       name: 'Default Channel',
//     //     });
    
       
//     //     await notifee.displayNotification({
//     //       title: 'Notification Title',
//     //       body: 'Main body content of the notification',
//     //       android: {
//     //         channelId,
//     //         // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
//     //         // pressAction is needed if you want the notification to open the app when pressed
//     //         pressAction: {
//     //           id: 'default',
//     //         },
//     //       },
//     //     });
//     //   }

//       async function onCreateTriggerNotification() {
//         console.log("reminder set")
//         const date = new Date(Date.now());
//         date.setHours(18);
//         date.setMinutes(10);

//         await notifee.requestPermission()

//         const channelId = await notifee.createChannel({
//             id: 'default',
//             name: 'Default Channel',
//           });
    
//         const trigger = {
//           type: TriggerType.TIMESTAMP,
//           timestamp: date.getTime(), 
//         };
    
//         await notifee.createTriggerNotification(
//           {
//             title: 'Meeting',
//             body: 'Today at 16:51 pm',
//             android: {
//               channelId: channelId,
//             },
//           },
//           trigger,
//         );
//       }


//     return (
//         <View style={{flex:1, backgroundColor:APPCOLOR.BACKGROUND,
//             justifyContent:"center", alignItems:"center",}}>
//             <Text style={{color:"black"}}>
//                 CheckList
//             </Text>

//             {/* <TouchableOpacity 
//             onPress={onDisplayNotification} 
//             style={{backgroundColor:"pink", padding:20, 
//             justifyContent:"center", alignItems:"center",
//              width:"50%", marginVertical:10}}>
//                 <Text style={{color:"black"}}>
//                     Notif
//                 </Text>
//             </TouchableOpacity> */}

//             <TouchableOpacity 
//             onPress={onCreateTriggerNotification} 
//             style={{backgroundColor:"blue", padding:20, 
//             justifyContent:"center", alignItems:"center",
//              width:"50%", marginVertical:10}}>
//                 <Text style={{color:"white"}}>
//                     Timer
//                 </Text>
//             </TouchableOpacity>

//         </View>
//     )
// }

// export default CheckList;