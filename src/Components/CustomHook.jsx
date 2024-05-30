import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { clearUserData, saveUser } from "../Redux/Slices/demoSlice"; 
import { addDocumentsForUser } from "../Common/firebaseUtils";
import { Alert } from "react-native";
import { PROVIDER } from "../Constants/signingConstants";


export default function useAuthentication() {
const dispatch = useDispatch();
const myProvider = useSelector(state=>state.user.provider)
const [isLoading, setIsLoading] = useState(false);


const signInCall = async ({email, password}) => 
    { setIsLoading (true);
try {
const {user} = await auth().signInWithEmailAndPassword(
 email,
password
);
console.log(user, "THIS IS CUSTOMHOOK LOGIN")
dispatch(saveUser({
    displayName: user.displayName,
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    provider: PROVIDER.EMAIL,
}));
} catch (err) {
Alert.alert("Error logging in" , `${err.message}`);
} finally {
setIsLoading(false);
}
};


const signUpCall = async ({ email, password, firstName, lastName, imageUri }) => {
  setIsLoading(true);
  try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      let photoURL = null;
      if (imageUri) {
          photoURL = await uploadImageToFirebase(imageUri, user.uid);
      }

      await user.updateProfile({
          displayName: `${firstName} ${lastName}`,
          photoURL: photoURL,
      });

      console.log("Updated Profile", user);

      dispatch(saveUser({
          displayName: `${firstName} ${lastName}`,
          uid: user.uid,
          email: user.email,
          photoURL,
          provider: PROVIDER.EMAIL,
      }));

      await addDocumentsForUser(user.uid);

      console.log("THIS IS SIGNUP END", user);

  } catch (err) {
      Alert.alert(`${err.message}`);
  } finally {
      setIsLoading(false);
  }
};

const uploadImageToFirebase = async (imageUri, userId) => {
  const storageRef = storage().ref(`profile_images/${userId}.jpg`);
  const response = await fetch(imageUri);
  const blob = await response.blob();
  await storageRef.put(blob);
  const downloadURL = await storageRef.getDownloadURL();
  console.log(downloadURL, "DOWNLOAD");
  return downloadURL;
};


  const signOutCall = async () => {
    setIsLoading(true);
    try {
        if (myProvider === PROVIDER.GOOGLE) {
            console.log("inside")
            await GoogleSignin.signOut();
        }
        else 
        {
          await auth().signOut();
        }
        dispatch(clearUserData());
        console.log("user signed out!");

    } catch (err) {
        console.log(err);
    } finally {
        setIsLoading(false);
    }
};

const googleLoginCall = async () => {
    try {
        await GoogleSignin.hasPlayServices();

        const userInfo = await GoogleSignin.signIn();
        const credential = auth.GoogleAuthProvider.credential(userInfo.idToken);
        const { user, additionalUserInfo } = await auth().signInWithCredential(credential);
            dispatch(saveUser({
                displayName: user.displayName,
                uid: user.uid,
                email: user.email,
                photoURL: user.photoURL,
                provider: PROVIDER.GOOGLE,
            }));
        if(additionalUserInfo.isNewUser) {
            await addDocumentsForUser(user.uid);
           }
    
              console.log('User account created & signed in!', user);
    

            } catch (error) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Google Sign-In Cancelled');
              } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Signin in progress');
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
              }
               else {
                Alert.alert(error);
              }
            }
};

return {isLoading, signInCall, signUpCall, signOutCall, googleLoginCall, uploadImageToFirebase};
}
