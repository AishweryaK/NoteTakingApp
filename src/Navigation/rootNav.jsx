import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import { APPCOLOR } from "../Assets/Colors/appColors";
import { FONT } from "../Constants/fontConstants";
import AppNavigation from "./appNav";
import AuthNavigation from "./authNav";
// import { RootStackParamList } from "./routeTypes";
import auth from '@react-native-firebase/auth';
import Walkthrough from "../Screens/WalkthroughScreen/Walkthrough";
import HomeNavigation from "./bottomTab";
import AddNote from "../Screens/AddNoteScreen/AddNote";
import NotesScreen from "../Screens/ShowNotes/ShowNotes";
import ForgotPassScreen from "../Screens/ForgotPassScreen/ForgotPass";
import Signup from "../Screens/SignupScreen/Signup";
import Login from "../Screens/LoginScreen/Login";
import NetInfo from "@react-native-community/netinfo";



function StackNavigation() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log("YE HAI INSIDE ON AUT CHANGED", user)
    });
    return () => unsubscribe();
  }, []);

  useEffect(()=>{
    NetInfo.addEventListener(
      ({ isConnected, isInternetReachable, type, detail }) => {
        console.log('update the previous note internet status',isConnected,isInternetReachable)
      }
    );
  },[])

  return (
    <Stack.Navigator initialRouteName={user ? NAVIGATION.HOMESCREEN : NAVIGATION.WALKTHROUGH} screenOptions={{headerShown:false, headerStyle: {
      backgroundColor: APPCOLOR.BACKGROUND,
    },
    headerShadowVisible:false,
    headerTintColor:APPCOLOR.HEADERTITLE,
    headerTitleAlign:"center",
    headerTitleStyle: {
      fontFamily:FONT.BOLD,
      fontSize:18,
    },}}> 
      {/* {user? <AppNavigation/> : <AuthNavigation />} */}
      <Stack.Screen name="App" component={user ? AppNavigation : AuthNavigation} />
    </Stack.Navigator>

    // <Stack.Navigator initialRouteName={NAVIGATION.WALKTHROUGH} screenOptions={{headerShown:false, headerStyle: {
    //   backgroundColor: APPCOLOR.BACKGROUND,
    // },
    // headerShadowVisible:false,
    // headerTintColor:APPCOLOR.HEADERTITLE,
    // headerTitleAlign:"center",
    // headerTitleStyle: {
    //   fontFamily:FONT.BOLD,
    //   fontSize:18,
    // },}}> 
    //   <Stack.Screen name={NAVIGATION.WALKTHROUGH} component={Walkthrough} options={{headerShown:false}} />  
    //   <Stack.Screen name={NAVIGATION.LOGIN} component={Login} options={{headerShown:true, title:"Log in", headerBackTitleVisible:false
    //   }}/>
    //   <Stack.Screen name={NAVIGATION.SIGNUP} component={Signup} options={{headerShown:true, title:"Sign up", headerBackTitleVisible:false}} />
    //   {/* <Stack.Screen name={NAVIGATION.HOMESCREEN} component={Home}/> */}
    //   <Stack.Screen name={NAVIGATION.HOMESCREEN} component={HomeNavigation} />
    //   <Stack.Screen name={NAVIGATION.ADDNOTE} component={AddNote} options={{headerShown:true, title:"Add Note", headerBackTitleVisible:false}} />
    //   <Stack.Screen name={NAVIGATION.NOTESCREEN} component={NotesScreen} options={{headerShown:true, title:"Notes", headerBackTitle:"BACK"}} />
    //   <Stack.Screen name={NAVIGATION.FORGOTPASS} component={ForgotPassScreen} options={{headerShown:true, title:"Forgot Password", headerBackTitleVisible:false}} />
    // </Stack.Navigator>

  );
}

export default StackNavigation;
