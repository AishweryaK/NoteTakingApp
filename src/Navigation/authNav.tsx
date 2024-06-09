import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import Login from "../Screens/LoginScreen/Login";
import Signup from "../Screens/SignupScreen/Signup";
import Walkthrough from "../Screens/WalkthroughScreen/Walkthrough";
import ForgotPassScreen from "../Screens/ForgotPassScreen/ForgotPass";
import { FONT } from "../Constants/fontConstants";
import { useSelector } from "react-redux";
import { getThemeColors } from "../Assets/Colors/themeColors";
import { TITLE } from "../Constants/strings";



function AuthNavigation() {
  const theme = useSelector((state)=> state.user.theme)
  const colors = getThemeColors(theme);
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={NAVIGATION.WALKTHROUGH} screenOptions={{headerShown:false, headerStyle: {
      backgroundColor: colors.BACKGROUND,
    },
    headerShadowVisible:false,
    headerTintColor:colors.HEADERTITLE,
    headerTitleAlign:"center",
    headerTitleStyle: {
      fontFamily:FONT.BOLD,
      fontSize:18,
    },}}> 
      <Stack.Screen name={NAVIGATION.WALKTHROUGH} component={Walkthrough} 
        options={{headerShown:false}}/>  
      <Stack.Screen name={NAVIGATION.LOGIN} component={Login} 
        options={{headerShown:true, title:TITLE.LOGIN, headerBackTitleVisible:false}}/>
      <Stack.Screen name={NAVIGATION.SIGNUP} component={Signup} 
        options={{headerShown:true, title:TITLE.SIGNUP, headerBackTitleVisible:false}}/>
      <Stack.Screen name={NAVIGATION.FORGOTPASS} component={ForgotPassScreen} 
        options={{headerShown:true, title:TITLE.FORGOT, headerBackTitleVisible:false}}/>
    </Stack.Navigator>
  );
}

export default AuthNavigation;