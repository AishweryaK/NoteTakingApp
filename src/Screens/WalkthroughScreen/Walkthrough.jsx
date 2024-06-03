import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";
import CustomButton from "../../Components/CustomButton";
import { NAVIGATION } from "../../Constants/navConstants";
import GoogleLogin from "../../Components/GoogleLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { getThemeColors } from "../../Assets/Colors/themeColors";


export default function Walkthrough ({navigation}) {
    const theme = useSelector((state)=>state.user.theme)
    const colors= getThemeColors(theme);
// console.log(dimensions.width, dimensions.height)
    
//   useEffect (() => {
//     AsyncStorage.clear();
//     console.log("Cleared in Walkthrough");
//   },[])



    return (
    <View style={styles.wrapper(colors)}>

        <Text style={styles.title(colors)}>
            Notes App
        </Text>

        <Image source={require("../../Assets/Images/Diary.png")} 
        style={styles.img} />

        <Text style={styles.txt(colors)}>
            Save and share notes
        </Text>

        <View style={styles.button}>
        <CustomButton
        handleButton={()=>navigation.navigate(NAVIGATION.SIGNUP)}
        text="Create Account"
        disable={false}
        />

        <GoogleLogin navigation={navigation}/>

        <View style={styles.loginButton}>
    <Text style={styles.loginTxt(colors)}>
        Have an account? 
        <Text onPress={() => navigation.navigate(NAVIGATION.LOGIN)} 
        style={styles.login(colors)}> Log in
        </Text>
    </Text>
</View>
        </View>
    </View>
    )
}