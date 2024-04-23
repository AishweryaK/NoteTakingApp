import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import Login from "../Screens/LoginScreen/Login";
import Home from "../Screens/HomeScreen/Home";
// import { RootStackParamList } from "./routeTypes";



function StackNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName={NAVIGATION.LOGIN}>    
      <Stack.Screen name={NAVIGATION.LOGIN} component={Login} />
      <Stack.Screen name={NAVIGATION.HOMESCREEN} component={Home} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
