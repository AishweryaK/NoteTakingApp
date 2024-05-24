import React, { useState, useEffect } from "react";
import { Text, View, Image, SafeAreaView, ActivityIndicator, ScrollView } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
import { homeStyles } from "./homeStyle";
import auth from '@react-native-firebase/auth';
import { dimensions } from "../../Constants/utility";
import AvailSpace from "./AvailSpace";
import CustomList from "../../Components/CustomList";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { useSelector } from "react-redux";
import { getThemeColors, themeColors } from "../../Assets/Colors/themeColors";

function Home({ navigation }) {
  const user = useSelector((state) => state.user);
  const colors = getThemeColors(user.theme);

  // console.log(user.displayName,"THIS IS REDUX VALUE")

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
      
      {/* <ScrollView>
      <View style={{ alignItems: "center" ,}}>
        <AvailSpace /> */}
      

      {user.uid ? (
        <View style={{alignItems:"center"}}>
          <CustomList navigation={navigation} />
         </View>
      ) : (
          <View>
          <ActivityIndicator size="large" color={themeColors.LIGHT.BLUE} />
        </View>
     
      )}
      {/* </View>
      </ScrollView> */}
    </SafeAreaView>
  )
}

export default Home;
