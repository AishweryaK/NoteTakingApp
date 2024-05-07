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
// import Icon from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons';



function HomeNavigation() {
  const Tab = createBottomTabNavigator();
   
  return (
    // <Tab.Navigator initialRouteName={NAVIGATION.HOME} screenOptions={{headerShown:false,
    //   // tabBarShowLabel:false, 
    //   tabBarStyle:{
    //   backgroundColor: APPCOLOR.WHITE, borderRadius:20, width:dimensions.width*0.9, justifyContent:"center",
    // }}} 
    // >    
    <Tab.Navigator
        initialRouteName={NAVIGATION.HOME}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === NAVIGATION.HOME) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === NAVIGATION.SETTINGS) {
              iconName = focused ? 'settings' : "settings-outline";

            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor:"red",
          tabBarInactiveTintColor:"grey",
          // tabBarLabelStyle: {

          // },
          tabBarStyle: {
              backgroundColor: APPCOLOR.WHITE, borderRadius:20, 
              // width:dimensions.width*0.9, 
              justifyContent:"center",
              paddingHorizontal:16,
            }
        })}
        // tabBarOptions={{
        //   activeTintColor: 'tomato',
        //   inactiveTintColor: 'grey',
        //   labelStyle: { paddingBottom: 10, fontSize: 10 },
        //   style: { padding: 10, height: 70}
        // }}
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
// // import Ionicons from 'react-native-vector-icons/Ionicons';



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