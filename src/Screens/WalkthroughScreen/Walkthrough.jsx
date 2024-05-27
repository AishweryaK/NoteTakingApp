import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../SignupScreen/styles";
import { wlkStyles } from "./walkthroughStyles";
import CustomButton from "../../Components/CustomButton";
import { NAVIGATION } from "../../Constants/navConstants";
import GoogleLogin from "../../Components/GoogleLogin";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { getThemeColors } from "../../Assets/Colors/themeColors";


export default function Walkthrough ({navigation}) {
    const theme = useSelector((state)=>state.user.theme)
    const colors= getThemeColors(theme);

    
//   useEffect (() => {
//     AsyncStorage.clear();
//     console.log("HEHEHEHEHEHEH");
//   },[])

    return (
    <View style={styles.wrapper(colors)}>
        <Text style={wlkStyles.title(colors)}>
            Notes App
        </Text>

        <Image source={require("../../Assets/Images/Diary.png")} 
        style={wlkStyles.img} />

        <Text style={wlkStyles.txt(colors)}>
            Save and share notes
        </Text>

        <View style={wlkStyles.button}>
        <CustomButton
        handleButton={()=>navigation.navigate(NAVIGATION.SIGNUP)}
        text="Create Account"
        disable={false}
        />

        <GoogleLogin navigation={navigation}/>

        <View style={wlkStyles.loginButton}>
    <Text style={wlkStyles.loginTxt(colors)}>
        Have an account? 
        <Text onPress={() => navigation.navigate(NAVIGATION.LOGIN)} 
        style={wlkStyles.login(colors)}> Log in
        </Text>
    </Text>
</View>

        </View>


    </View>
    )
}