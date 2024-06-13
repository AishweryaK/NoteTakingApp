import React, {useEffect, useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {buttonStyles} from '../CustomButton/styles';
import GoogleIcon from '../../Assets/Svgs/GoogleIcon';
import useAuthentication from '../CustomHook/CustomHook';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';

function GoogleLogin() {
  const {googleLoginCall} = useAuthentication();
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const connection = useReduxSelector(state => state.internet.connection);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '630539047377-kfbbhc2l502b6gh679v5v7el4b618vou.apps.googleusercontent.com',
    });
  }, []);

  const signInBTNPress = async () => {
    if (connection) {
      await googleLoginCall();
    } else
      Alert.alert(
        'No Internet Connection',
        'Please check your internet connection and try again.',
      );
  };

  return (
    <TouchableOpacity
      style={[
        buttonStyles.customButton(colors),
        buttonStyles.googleButton(colors),
      ]}
      onPress={signInBTNPress}>
      <GoogleIcon width={25} height={25} />
      <View style={buttonStyles.view}>
        <Text
          style={[
            buttonStyles.buttonText(colors),
            buttonStyles.googleTxt(colors),
          ]}>
          {' '}
          Continue with Google{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default GoogleLogin;
