import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../../Assets/Svgs/MenuIcon";
import BottomNavigation from "../../Navigation/bottomTab";
import { styles } from "../SignupScreen/styles";
import { homeStyles } from "./homeStyle";
import auth from '@react-native-firebase/auth';
import { APPCOLOR } from "../../Assets/Colors/appColors";

function Home({navigation}) {
    const handleAddNote =() =>{
        navigation.navigate(NAVIGATION.ADDNOTE)
    }

    const handleUser = () => {
      const user = auth().currentUser;
      console.log(user, "THIS IS CURR USER")
    }

    return (
        <SafeAreaView 
        style={{flex:1, paddingTop:30, backgroundColor:APPCOLOR.BACKGROUND}}
        >
          {/* <TouchableOpacity
          onPress={handleUser}
          style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
          <Text style={styles.submitBtnTxt}> get current user </Text>
        </TouchableOpacity> */}

        <View style={{paddingHorizontal:16, flexDirection:"row", justifyContent:"space-between"}}>
          <View style={{flex:1, flexDirection:"column"}
          }>
          <Text 
          style={homeStyles.welcome}>
            Welcome, {auth().currentUser.displayName} ! 
            </Text>
            <Text
            style={homeStyles.title}>
              Notes App
            </Text>
        </View>
        <Image 
        style={homeStyles.userImg}
        source={{uri:auth().currentUser.photoURL}} />
        </View>

        <View
        style={{alignItems:"center", paddingTop:40}}>
        <Image source={require("/Users/chicmic/659_ReactNative/NoteTakingApp/src/Assets/Images/AvailableSpace.png")} 
        resizeMode="stretch"
         style={[homeStyles.img]} /> 
        </View>
        


          {/* <View style={homeStyles.buttonShadow}>
            <TouchableOpacity 
          onPress={handleAddNote}>
            <Text style={homeStyles.buttonText}>
              +
            </Text>
          </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

export default Home;