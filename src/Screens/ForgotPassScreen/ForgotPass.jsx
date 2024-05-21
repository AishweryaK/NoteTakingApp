import React, { useState } from "react";
import { View, KeyboardAvoidingView, Alert } from "react-native";
import { styles } from "../SignupScreen/styles";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import auth from '@react-native-firebase/auth';
import { passStyles } from "./passStyles";
import { SIGNING } from "../../Constants/signingConstants";
import { NAVIGATION } from "../../Constants/navConstants";
import { useSelector } from "react-redux";
import { getThemeColors } from "../../Assets/Colors/themeColors";

function ForgotPassScreen ({navigation}) {
    const [email, setEmail] = useState("");
    const theme = useSelector((state)=>state.user.theme)
    const colors= getThemeColors(theme);

    const handleEmail= () => {
        // console.log(email)
        auth().sendPasswordResetEmail(email)
        .then(()=>
        {Alert.alert("Email sent successfully!", "Please set a new password");
        navigation.navigate(NAVIGATION.LOGIN);
    }
    )
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(`Error sending email`, `${errorMessage}` )
    })
};


    return (
        // <View style={styles.wrapper}>
        <KeyboardAvoidingView
      keyboardVerticalOffset={65}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper(colors)}>
            <CustomInput 
            placeHolder={SIGNING.EMAIL}
            value={email}
            handleChange={(text)=> setEmail(text)}
            />
            
            <View style={passStyles.bottom}>
            <CustomButton 
            handleButton={handleEmail}
            text={"Verify"}
            disable={false}
            />
            </View>
            </KeyboardAvoidingView>
        // </View>
    )
}

export default ForgotPassScreen;