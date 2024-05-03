import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import Login from "../Screens/LoginScreen/Login";
import Home from "../Screens/HomeScreen/Home";
import AddNote from "../Screens/AddNoteScreen/AddNote";
import Signup from "../Screens/SignupScreen/Signup";
import { APPCOLOR } from "../Assets/Colors/appColors";
import { FONT } from "../Constants/fontConstants";
import Walkthrough from "../Screens/WalkthroughScreen/Walkthrough";
// import { RootStackParamList } from "./routeTypes";



function StackNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={NAVIGATION.WALKTHROUGH} screenOptions={{headerShown:false, headerStyle: {
      backgroundColor: APPCOLOR.BACKGROUND,
    },
    headerShadowVisible:false,
    headerTintColor:APPCOLOR.HEADERTITLE,
    headerTitleStyle: {
      fontFamily:FONT.EXTRA_BOLD,
      // fontFamily:FONT.REGULAR,
      fontSize:18,
    },}}> 
      <Stack.Screen name={NAVIGATION.WALKTHROUGH} component={Walkthrough} options={{headerShown:false}} />  
      <Stack.Screen name={NAVIGATION.LOGIN} component={Login} options={{headerShown:true, title:"Log in", headerBackTitleVisible:false
      }}/>
      <Stack.Screen name={NAVIGATION.SIGNUP} component={Signup} options={{headerShown:true}} />
      <Stack.Screen name={NAVIGATION.HOMESCREEN} component={Home}/>
      <Stack.Screen name={NAVIGATION.ADDNOTE} component={AddNote} options={{headerShown:true}} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
