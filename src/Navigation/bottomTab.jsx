import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import Login from "../Screens/LoginScreen/Login";
import Home from "../Screens/HomeScreen/Home";
import AddNote from "../Screens/AddNoteScreen/AddNote";
// import { RootStackParamList } from "./routeTypes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../Screens/SettingsScreen/Settings";
import { APPCOLOR } from "../Assets/Colors/appColors";
import { dimensions } from "../Constants/utility";



function HomeNavigation() {
  const Tab = createBottomTabNavigator();
   
  return (
    <Tab.Navigator initialRouteName={NAVIGATION.HOME} screenOptions={{headerShown:false,
      // tabBarShowLabel:false, 
    //   tabBarStyle:{
    //   backgroundColor: APPCOLOR.WHITE, borderRadius:20, width:dimensions.width*0.9, justifyContent:"center",
    // }
  }} 
    >    



      <Tab.Screen name={NAVIGATION.HOME} component={Home}  />
      {/* <Tab.Screen name={NAVIGATION.ADDNOTE} component={AddNote}  /> */}
      {/* <Tab.Screen name={NAVIGATION.HOMESCREEN} component={Home}  /> */}
      <Tab.Screen name={NAVIGATION.SETTINGS} component={Settings}  />
    </Tab.Navigator>
  );
}

export default HomeNavigation;







// import React from "react";
// // import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NAVIGATION } from "../Constants/navConstants";
// import Login from "../Screens/LoginScreen/Login";
// import Home from "../Screens/HomeScreen/Home";
// import AddNote from "../Screens/AddNoteScreen/AddNote";
// // import { RootStackParamList } from "./routeTypes";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Settings from "../Screens/SettingsScreen/Settings";
// import { APPCOLOR } from "../Assets/Colors/appColors";
// import { dimensions } from "../Constants/utility";
// import Icon from "react-native-vector-icons/AntDesign";



// function HomeNavigation() {
//   const Tab = createBottomTabNavigator();

//   const screenOptions = (route, color) => {
//     let iconName;
   
//     switch (route.name) {
//       case NAVIGATION.HOME:
//         iconName = 'home';
//         break;
//       case NAVIGATION.SETTINGS:
//         iconName = 'appstore-o';
//         break;
//       default:
//         break;
//     }
   
//     return <Icon name={iconName} color={color} size={24} />;
//    };
   
//   return (  
//     <Tab.Navigator
//         initialRouteName={NAVIGATION.HOME}
//         screenOptions={({route}) => ({
//           tabBarIcon: ({color}) => screenOptions(route, color),
//         })}
//         >
//       <Tab.Screen name={NAVIGATION.HOME} component={Home}  />
//       <Tab.Screen name={NAVIGATION.SETTINGS} component={Settings}  />
//     </Tab.Navigator>
//   );
// }

// export default HomeNavigation;