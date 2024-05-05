import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../SignupScreen/styles";
import { wlkStyles } from "./walkthroughStyles";
import CustomButton from "../../Components/CustomButton";
import { NAVIGATION } from "../../Constants/navConstants";
import GoogleLogin from "../../Components/GoogleLogin";


export default function Walkthrough ({navigation}) {
    return (
    <View style={styles.wrapper}>
        <Text style={wlkStyles.title}>
            Notes App
        </Text>

        <Image source={require("../../Assets/Images/Diary.png")} 
        style={wlkStyles.img} />

        <Text style={wlkStyles.txt}>
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
        <Text
        style={wlkStyles.loginTxt}
        >
           Have an account? <TouchableOpacity
           style={wlkStyles.touchable}
           onPress={()=>navigation.navigate(NAVIGATION.LOGIN)}
           >
            <Text
            style={wlkStyles.login}
            >
                Log in
            </Text>
            </TouchableOpacity> 
        </Text>
        </View>

        </View>


    </View>
    )
}