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
import auth from '@react-native-firebase/auth';
import { buttonStyles } from '../Common/styles';
import GoogleIcon from '../Assets/Svgs/GoogleIcon';
import { NAVIGATION } from '../Constants/navConstants';
import firestore from "@react-native-firebase/firestore"
import { addDocumentsForUser } from '../Common/firebaseUtils';


function GoogleLogin ({navigation}) {
    const [userInfo, setuserInfo] = useState(null);


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
          // console.log(usrInfo, "google info")
          setuserInfo(usrInfo);
          
          const credential = auth.GoogleAuthProvider.credential(usrInfo.idToken);
          const userData = await auth().signInWithCredential(credential);
          // console.log(credential, "Credential");

          // console.log(userData, "after signin");

      //   const userDoc = await firestore().collection('users').doc(userData.user.uid).get();
      //   console.log(userDoc, "userDoc")
      // if (!userDoc.exists) {
      //   // User doesn't exist, so add a new note
      //   console.log("inside If")
      //   await firestore().collection('users').doc(userData.user.uid).collection('notes').add({
      //     title: "",
      //     desc: "",
      //   });
      // }

      // if(userData.additionalUserInfo.isNewUser) {
      //   console.log("inside iff")
      // await firestore().collection('users').doc(userData.user.uid).collection('notes').add({
      //   title:"",
      //   desc:"",
      // }); }

      if(userData.additionalUserInfo.isNewUser) {
        console.log("inside if");

        await addDocumentsForUser(userData.user.uid);
       }

          
          console.log('User account created & signed in!', userData.user);

          navigation.navigate(NAVIGATION.HOMESCREEN);

        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            Alert.alert('Signin with Cancelled');
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

      return (
       
         <View style={[buttonStyles.customButton, buttonStyles.googleButton]}>
            <GoogleIcon width={25} height={25}
            />
            <TouchableOpacity
            onPress={signInBTNPress}
            >
            <Text style={[buttonStyles.buttonText,buttonStyles.googleTxt]}> Continue with Google </Text>
            </TouchableOpacity>
        </View>
      
      )
}


export default GoogleLogin;

