import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATION } from "../Constants/navConstants";
import AddNote from "../Screens/AddNoteScreen/AddNote";
import NotesScreen from "../Screens/ShowNotes/ShowNotes";
import HomeNavigation from "./bottomTab";
// import { RootStackParamList } from "./routeTypes";



function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Screen name={NAVIGATION.HOMESCREEN} component={HomeNavigation}/>
      <Stack.Screen name={NAVIGATION.ADDNOTE} component={AddNote} 
        options={{headerShown:true, title:"Add Note", headerBackTitleVisible:false}}/>
      <Stack.Screen name={NAVIGATION.NOTESCREEN} component={NotesScreen} 
        options={{headerShown:true, title:"Notes", headerBackTitle:"BACK"}}/>
      </>
  );
}

export default AppNavigation;
