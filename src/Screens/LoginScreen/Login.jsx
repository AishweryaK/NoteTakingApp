import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NAVIGATION} from '../../Constants/navConstants';
import auth from '@react-native-firebase/auth';
import { styles } from '../SignupScreen/styles';
import { SIGNING } from '../../Constants/signingConstants';
import { loginStyles } from './loginStyles';

function Login({navigation}) {
  const [userInfo, setuserInfo] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);


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
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      console.log(usrInfo)
      setuserInfo(usrInfo);
      
      const credential = auth.GoogleAuthProvider.credential(usrInfo.idToken);
      await auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign in with google Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else if (error.code === 10) {
        Alert.alert('dev err');
      } else {
        console.log(error, 'hell');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setuserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHome = () => {
    navigation.navigate(NAVIGATION.HOMESCREEN);
  };

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <View style={styles.wrapper}>
        {/* <ScrollView> */}
        <View style={styles.formContainer}>
        <Text style={styles.title}>
                Log In
            </Text>
            <View style={loginStyles.usrInfo}>
        {userInfo != null && (
          <>
            <Text>{userInfo.user.name}</Text>
            <Text>{userInfo.user.email}</Text>
            <Image
              source={{uri: userInfo.user.photo}}
              style={loginStyles.imgStyle}
            />
          </>
        )}
        </View>

        <View style={styles.inputWrapper} >

            <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.EMAIL} 
            value={email}
            onChangeText={(text)=>setEmail(text)}  />
            </View>

            <View style={styles.inputWrapper} >

            <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.SETPASSWORD} 
            value={pass}
            onChangeText={(text)=>setPass(text)}  />
            </View>

        <TouchableOpacity
          onPress={handleHome}
          style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
          <Text style={styles.submitBtnTxt}> go to home page </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>navigation.navigate(NAVIGATION.SIGNUP)}
          style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
          <Text style={styles.submitBtnTxt}> Sign up </Text>
        </TouchableOpacity>

        
        {userInfo == null ? (
          <TouchableOpacity
            onPress={signInBTNPress}
            style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
            <Text style={styles.submitBtnTxt}> Sign in using google </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={signOut}
            style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
            <Text style={styles.submitBtnTxt}> Sign out </Text>
          </TouchableOpacity>
        )}

        {/* </ScrollView> */}
        </View>
      </View>
    </>
  );
}

export default Login;
