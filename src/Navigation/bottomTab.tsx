import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import Login from "../Screens/LoginScreen/Login";
import Home from "../Screens/HomeScreen/Home";
import AddNote from "../Screens/AddNoteScreen.tsx/AddNote";
// import { RootStackParamList } from "./routeTypes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator 
    >    
      {/* <Tab.Screen name={NAVIGATION.LOGIN} component={Login} /> */}
      {/* <Tab.Screen name={NAVIGATION.HOMESCREEN} component={Home} /> */}
      <Tab.Screen name={NAVIGATION.ADDNOTE} component={AddNote}  />
    </Tab.Navigator>
  );
}

export default BottomNavigation;