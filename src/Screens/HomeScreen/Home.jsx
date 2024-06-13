import React, { useState, useEffect } from "react";
import { Text, View, Image, SafeAreaView, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { homeStyles } from "./homeStyle";
import CustomList from "../../Components/CustomList/CustomList";
import { useReduxSelector } from "../Redux/Store/store";
import { getThemeColors, themeColors } from "../../Assets/Colors/themeColors";
import { NAVIGATION } from "../../Constants/navConstants";

function Home({ navigation }) {
  const user = useReduxSelector((state) => state.user);
  const colors = getThemeColors(user.theme);

  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);


  return (
    <SafeAreaView style={homeStyles.safeArea(colors)}>
     
       
        <View style={homeStyles.outer}>
          <View style={homeStyles.inner}>
            <Text style={homeStyles.welcome(colors)}>
              Welcome, {user.displayName} ! 
            </Text>
            <Text style={homeStyles.title(colors)}>Notes App</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate(NAVIGATION.ACCOUNT)}>
            {user.photoURL ? (
            
            <Image
              style={homeStyles.userImg(colors)}
              source={{ uri: user.photoURL }}
            />
          ) : (
            <Image
              style={homeStyles.userImg(colors)}
              source={require('../../Assets/Images/userImg.jpeg')}
            />
          )}
          </TouchableOpacity>
        </View>

      {user.uid ? (
        <View style={{alignItems:"center"}}>
          <CustomList navigation={navigation} />
         </View>
      ) : (
          <View>
          <ActivityIndicator size="large" color={themeColors.LIGHT.BLUE} />
        </View>
     
      )}
    </SafeAreaView>
  )
}

export default Home;
