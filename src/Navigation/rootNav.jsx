import React, { useEffect, useState } from "react";
import {View} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import { APPCOLOR } from "../Assets/Colors/appColors";
import { FONT } from "../Constants/fontConstants";
import AppNavigation from "./appNav";
import AuthNavigation from "./authNav";
// import { RootStackParamList } from "./routeTypes";
import NetInfo from "@react-native-community/netinfo";
import { useSelector } from "react-redux";
import { getThemeColors } from "../Assets/Colors/themeColors";



function StackNavigation() {
  const Stack = createNativeStackNavigator();
  const {theme, uid} = useSelector((state) => state.user);
  const colors = getThemeColors(theme);

  // console.log(user, "USERR")

  // useEffect(() => {
  //   const unsubscribe = auth().onAuthStateChanged((user) => {
  //     setUser(user);
  //     console.log(user)
  //   });
  //   return () => unsubscribe();
  // }, []);

  // useEffect(()=>{
  //   NetInfo.addEventListener(
  //     ({ isConnected, isInternetReachable, type, detail }) => {
  //       console.log('update the previous note internet status',isConnected,isInternetReachable)
  //     }
  //   );
  // },[])

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
