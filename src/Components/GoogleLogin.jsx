import React, {useEffect, useState} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { buttonStyles } from '../Common/styles';
import GoogleIcon from '../Assets/Svgs/GoogleIcon';
import useAuthentication from './CustomHook';
import { useSelector } from 'react-redux';
import { getThemeColors } from '../Assets/Colors/themeColors';


function GoogleLogin ({navigation}) {
    const {googleLoginCall} = useAuthentication();
    const theme = useSelector((state)=>state.user.theme)
    const colors= getThemeColors(theme);


    useEffect(() => {
        GoogleSignin
          .configure(
            {
            webClientId:
            '630539047377-kfbbhc2l502b6gh679v5v7el4b618vou.apps.googleusercontent.com',
          } 
          );
      }, []);


      const signInBTNPress = async () => {
        await googleLoginCall();
      };

      return (
       
         <TouchableOpacity style={[buttonStyles.customButton(colors), buttonStyles.googleButton(colors)]}
         onPress={signInBTNPress}>
            <GoogleIcon width={25} height={25}
            />
            <View style={buttonStyles.view}>
            <Text style={[buttonStyles.buttonText(colors),buttonStyles.googleTxt(colors)]}> Continue with Google </Text>
            </View>
        </TouchableOpacity>
      
      )
}


export default GoogleLogin;




