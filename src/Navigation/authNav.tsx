import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import Login from "../Screens/LoginScreen/Login";
import Signup from "../Screens/SignupScreen/Signup";
import Walkthrough from "../Screens/WalkthroughScreen/Walkthrough";
import ForgotPassScreen from "../Screens/ForgotPassScreen/ForgotPass";



function AuthNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <> 
      <Stack.Screen name={NAVIGATION.WALKTHROUGH} component={Walkthrough} 
        options={{headerShown:false}}/>  
      <Stack.Screen name={NAVIGATION.LOGIN} component={Login} 
        options={{headerShown:true, title:"Log in", headerBackTitleVisible:false}}/>
      <Stack.Screen name={NAVIGATION.SIGNUP} component={Signup} 
        options={{headerShown:true, title:"Sign up", headerBackTitleVisible:false}}/>
      <Stack.Screen name={NAVIGATION.FORGOTPASS} component={ForgotPassScreen} 
        options={{headerShown:true, title:"Forgot Password", headerBackTitleVisible:false}}/>
    </>
  );
}

export default AuthNavigation;