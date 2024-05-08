import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NAVIGATION} from '../../Constants/navConstants';
import auth from '@react-native-firebase/auth';
import { styles } from '../SignupScreen/styles';
import { SIGNING } from '../../Constants/signingConstants';
import { loginStyles } from './loginStyles';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';

function Login({navigation}) {
  const [userInfo, setuserInfo] = useState(null);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

// console.log(email, pass)
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
      console.log(usrInfo, "google info")
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

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, pass);
      const user = userCredential.user;
      console.log('Logged in user:', user);
      
      if(user!=null)
    {
      navigation.navigate(NAVIGATION.HOMESCREEN)
      setEmail("");
      setPass("");
    }
    else 
    Alert.alert("Wrong credentials", "Please Sign up")
    } catch (error) {
      Alert.alert('Login error:', error.message);
    }

    
  };

  const handleUser = () => {
    const user = auth().currentUser;
    console.log(user, "THIS IS CURR USER")
  }

  const handleLogout = () => {
    auth().signOut().then(() => {
     console.log("user signed out!")
      }).catch((error) => {
        console.log("some err", error)
      });
  }

  // const handleHome = () => {
  //   navigation.navigate(NAVIGATION.HOMESCREEN);
  // };

  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <KeyboardAvoidingView
      keyboardVerticalOffset={65}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
        {/* <ScrollView> */}
        {/* <View style={styles.formContainer}> */}
        {/* <Text style={[styles.title, {fontFamily: "Nunito-Regular"} ]}>
                Log In
            </Text> */}
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

        {/* <View style={styles.inputWrapper} > */}

            {/* <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.EMAIL} 
            value={email}
            onChangeText={(text)=>setEmail(text)}  /> */}

            <CustomInput 
            placeHolder={SIGNING.EMAIL}
            value={email}
            handleChange={(text)=>setEmail(text)}
            />


            {/* </View> */}

            {/* <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.SETPASSWORD} 
            value={pass}
            onChangeText={(text)=>setPass(text)}  /> */}

            <CustomInput 
            placeHolder={SIGNING.SETPASSWORD}
            value={pass}
            handleChange={(text)=>setPass(text)}
            />

            <View style={loginStyles.button}>

            <TouchableOpacity onPress={()=>navigation.navigate(NAVIGATION.FORGOTPASS)} 
            >
            <Text style={loginStyles.forgotTxt}>
              Forgot Password?
            </Text>
            </TouchableOpacity>

            </View>
  

        {/* <TouchableOpacity
          onPress={handleHome}
          style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
          <Text style={styles.submitBtnTxt}> go to home page </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          onPress={handleLogin}
          style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
          <Text style={styles.submitBtnTxt}> Login </Text>
        </TouchableOpacity> */}

        <View style={loginStyles.bottom}>
        <CustomButton
        handleButton={handleLogin}
        text={'Log in'}
        disable={false} 
        />
        </View>

        {/* <TouchableOpacity
          onPress={()=>navigation.navigate(NAVIGATION.SIGNUP)}
          style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
          <Text style={styles.submitBtnTxt}> Sign up </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          onPress={handleUser}
          style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
          <Text style={styles.submitBtnTxt}> get current user </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          onPress={handleLogout}
          style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
          <Text style={styles.submitBtnTxt}> Logout </Text>
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
        )} */}

        {/* </ScrollView> */}
        {/* </View> */}
      </KeyboardAvoidingView>
    </>
  );
}

export default Login;
