import React, { useState, useEffect } from "react";
import { Text, View, Image, SafeAreaView, ActivityIndicator, ScrollView } from "react-native";
import { homeStyles } from "./homeStyle";
import CustomList from "../../Components/CustomList";
import { useSelector } from "react-redux";
import { getThemeColors, themeColors } from "../../Assets/Colors/themeColors";

function Home({ navigation }) {
  const user = useSelector((state) => state.user);
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
