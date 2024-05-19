import React, { useState, useEffect } from "react";
import { Text, View, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
import { homeStyles } from "./homeStyle";
import auth from '@react-native-firebase/auth';
import { dimensions } from "../../Constants/utility";
import AvailSpace from "./AvailSpace";
import CustomList from "../../Components/CustomList";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { useSelector } from "react-redux";

function Home({ navigation }) {
  const user = useSelector((state) => state.user);

  // console.log(user.displayName,"THIS IS REDUX VALUE")

  return (
    <SafeAreaView style={homeStyles.safeArea}>
     
       
        <View style={homeStyles.outer}>
          <View style={homeStyles.inner}>
            <Text style={homeStyles.welcome}>
              {/* Welcome, {currentUser ? displayName : ""} !  */}
              Welcome, {user.displayName} ! 
            </Text>
            <Text style={homeStyles.title}>Notes App</Text>
          </View>
          {/* {currentUser && currentUser.photoURL ? ( */}
            {user.photoURL ? (
            
            <Image
              style={homeStyles.userImg}
              source={{ uri: user.photoURL }}
            />
          ) : (
            <Image
              style={homeStyles.userImg}
              source={require('../../Assets/Images/userImg.jpeg')}
            />
          )}
        </View>
      

      <View style={{ alignItems: "center" }}>
        <AvailSpace />
      </View>

      {user.uid ? (
        <View style={{ flexDirection: "row", height: dimensions.height * 0.50 }}>
          <CustomList navigation={navigation} />
        </View>
      ) : (
          <View>
          <ActivityIndicator size="large" color={APPCOLOR.BLUE} />
        </View>
     
      )}
    </SafeAreaView>
  )
}

export default Home;
