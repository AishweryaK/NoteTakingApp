import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NAVIGATION } from '../Constants/navConstants';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={NAVIGATION.HOMESCREEN}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
  
              if (rn === NAVIGATION.HOMESCREEN) {
                iconName = focused ? ICONS.HOME(24, 24, color) : ICONS.HOME(24, 24, 'grey');
  
              } else if (rn === NAVIGATION.DETAILSSCREEN) {
                iconName = focused ? ICONS.NOTEFD(24, 24, color) : ICONS.NOTE(24, 24, 'grey');
  
              } else if (rn === NAVIGATION.SETTINGSSCREEN) {
                iconName = focused ? ICONS.SETTINGSFD(24, 24, color) : ICONS.SETTINGS(24, 24, 'grey');
              }
  
              return iconName;
            },
          })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer; 












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