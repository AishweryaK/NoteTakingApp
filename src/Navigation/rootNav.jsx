import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import { FONT } from "../Constants/fontConstants";
import AppNavigation from "./appNav";
import AuthNavigation from "./authNav";
import { useSelector } from "react-redux";
import { getThemeColors } from "../Assets/Colors/themeColors";



function StackNavigation() {
  const Stack = createNativeStackNavigator();
  const {theme, uid} = useSelector((state) => state.user);
  const colors = getThemeColors(theme);

  return (
   
    <Stack.Navigator initialRouteName={uid? NAVIGATION.HOMESCREEN : NAVIGATION.WALKTHROUGH} screenOptions={{headerShown:false, headerStyle: {
      backgroundColor: colors.BACKGROUND,
    },
    headerShadowVisible:false,
    headerTintColor:colors.HEADERTITLE,
    headerTitleAlign:"center",
    headerTitleStyle: {
      fontFamily:FONT.BOLD,
      fontSize:18,
    },}}> 
      {/* {user? <AppNavigation/> : <AuthNavigation />} */}
      <Stack.Screen name="App" component={uid ? AppNavigation : AuthNavigation} />
    </Stack.Navigator>

  );
}

export default StackNavigation;
