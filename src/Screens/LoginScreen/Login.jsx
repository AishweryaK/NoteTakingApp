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

function Login({navigation}) {
  const [userInfo, setuserInfo] = useState(null);

  useEffect(() => {
    GoogleSignin
      .configure
      //   {
      //   webClientId:
      //   '630539047377-kfbbhc2l502b6gh679v5v7el4b618vou.apps.googleusercontent.com',
      // }
      ();
  }, []);

  const signInBTNPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setuserInfo(usrInfo);
      // console.log(usrInfo)
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
      <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
        {/* <ScrollView> */}
        <Text style={{textAlign: 'center'}}> hello </Text>
        {userInfo != null && (
          <>
            <Text>{userInfo.user.name}</Text>
            <Text>{userInfo.user.email}</Text>
            <Image
              source={{uri: userInfo.user.photo}}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </>
        )}

        {userInfo == null ? (
          <TouchableOpacity
            onPress={signInBTNPress}
            style={{borderWidth: 2, paddingHorizontal: 20, marginTop: 20}}>
            <Text style={{textAlign: 'center', color: 'black'}}> Sign in </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={signOut}
            style={{borderWidth: 2, paddingHorizontal: 20, marginTop: 20}}>
            <Text style={{textAlign: 'center'}}> Sign out </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleHome}
          style={{borderWidth: 2, paddingHorizontal: 20, marginTop: 20}}>
          <Text style={{textAlign: 'center'}}> go to home page </Text>
        </TouchableOpacity>

        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  );
}

export default Login;
