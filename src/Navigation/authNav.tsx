import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import Login from "../Screens/LoginScreen/Login";
// import Home from "../Screens/HomeScreen/Home";
import AddNote from "../Screens/AddNoteScreen/AddNote";
import Signup from "../Screens/SignupScreen/Signup";
import { APPCOLOR } from "../Assets/Colors/appColors";
import { FONT } from "../Constants/fontConstants";
import Walkthrough from "../Screens/WalkthroughScreen/Walkthrough";
import NotesScreen from "../Screens/ShowNotes/ShowNotes";
import ForgotPassScreen from "../Screens/ForgotPassScreen/ForgotPass";
import HomeNavigation from "./bottomTab";
// import { RootStackParamList } from "./routeTypes";



function StackNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={NAVIGATION.HOMESCREEN} screenOptions={{headerShown:false, headerStyle: {
      backgroundColor: APPCOLOR.BACKGROUND,
    },
    headerShadowVisible:false,
    headerTintColor:APPCOLOR.HEADERTITLE,
    headerTitleAlign:"center",
    headerTitleStyle: {
      fontFamily:FONT.BOLD,
      fontSize:18,
    },}}> 
      <Stack.Screen name={NAVIGATION.WALKTHROUGH} component={Walkthrough} options={{headerShown:false}} />  
      <Stack.Screen name={NAVIGATION.LOGIN} component={Login} options={{headerShown:true, title:"Log in", headerBackTitleVisible:false
      }}/>
      <Stack.Screen name={NAVIGATION.SIGNUP} component={Signup} options={{headerShown:true, title:"Sign up", headerBackTitleVisible:false}} />
      {/* <Stack.Screen name={NAVIGATION.HOMESCREEN} component={Home}/> */}
      <Stack.Screen name={NAVIGATION.HOMESCREEN} component={HomeNavigation} />
      <Stack.Screen name={NAVIGATION.ADDNOTE} component={AddNote} options={{headerShown:true, title:"Add Note", headerBackTitleVisible:false}} />
      <Stack.Screen name={NAVIGATION.NOTESCREEN} component={NotesScreen} options={{headerShown:true, title:"Notes", headerBackTitle:"BACK"}} />
      <Stack.Screen name={NAVIGATION.FORGOTPASS} component={ForgotPassScreen} options={{headerShown:true, title:"Forgot Password", headerBackTitleVisible:false}} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
