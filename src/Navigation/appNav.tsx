import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import AddNote from "../Screens/AddNoteScreen/AddNote";
import NotesScreen from "../Screens/ShowNotes/ShowNotes";
import HomeNavigation from "./bottomTab";
import { RootStackParamsList } from "./routeTypes";
import { APPCOLOR } from "../Assets/Colors/appColors";
import { FONT } from "../Constants/fontConstants";
import AccountPage from "../Screens/Account/AccountScreen";



function AppNavigation() : React.JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamsList>();
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
      <Stack.Screen name={NAVIGATION.HOMESCREEN} component={HomeNavigation}/>
      <Stack.Screen name={NAVIGATION.ADDNOTE} component={AddNote} 
        options={{headerShown:true, title:"Add Note", headerBackTitleVisible:false}}/>
      <Stack.Screen name={NAVIGATION.NOTESCREEN} component={NotesScreen} 
        options={{headerShown:true, title:"Notes", headerBackTitle:"BACK"}}/>
         <Stack.Screen name={NAVIGATION.ACCOUNT} component={AccountPage} 
        options={{headerShown:true, title:"Account", headerBackTitleVisible:false}}/>
      </Stack.Navigator>
  );
}

export default AppNavigation;
