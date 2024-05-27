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
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION } from "../Constants/navConstants";


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
Alert.alert("Error Logging in" , `${err}`);
} finally {
setIsLoading(false);
}
};


const signUpCall = async ({ email, password, firstName, lastName, imageUri }) => {
  setIsLoading(true);
  try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);
      // console.log("THIS IS SIGNUP", user);
      let photoURL = null;
      if (imageUri) {
          // console.log("THIS SHOULD WORK");
          photoURL = await uploadImageToFirebase(imageUri, user.uid);
          // console.log("ENDDD")
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
  // console.log("Below ref")
  const response = await fetch(imageUri);
  // console.log("Below uri")
  const blob = await response.blob();
  // console.log("Below blob")
  await storageRef.put(blob);
  // console.log("Below putting")
  const downloadURL = await storageRef.getDownloadURL();
  // console.log("Below ref")
  console.log(downloadURL, "DOWNLOAD");
  return downloadURL;
};


  const signOutCall = async () => {
    setIsLoading(true);
    try {
        if (myProvider === PROVIDER.GOOGLE) {
            // const hello = await GoogleSignin.revokeAccess();
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
      // Alert.alert("1", "first")
        await GoogleSignin.hasPlayServices();
        // Alert.alert("2", "after hasplay") 
        //-----------
        const userInfo = await GoogleSignin.signIn();
        // Alert.alert("3 after signin")
        const credential = auth.GoogleAuthProvider.credential(userInfo.idToken);
        const { user, additionalUserInfo } = await auth().signInWithCredential(credential);
        // Alert.alert("4", "userrr")
            dispatch(saveUser({
                displayName: user.displayName,
                uid: user.uid,
                email: user.email,
                photoURL: user.photoURL,
                provider: PROVIDER.GOOGLE,
            }));
            // Alert.alert("5", "dispatch")
        if(additionalUserInfo.isNewUser) {
            // Alert.alert("inside if");
            await addDocumentsForUser(user.uid);
           }
    
              // Alert.alert('User account created & signed in!', user, "6")
              console.log('User account created & signed in!', user);
    

            } catch (error) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Signin with Google Cancelled');
              } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Signin in progress');
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
              } else if (error.code === 10) {
                Alert.alert('dev err');
              } else {
                Alert.alert(error, 'hello');
              }
            }
};

return {isLoading, signInCall, signUpCall, signOutCall, googleLoginCall, uploadImageToFirebase};
}









// const signUpCall = async ({email, password, firstName, lastName, imageUri}) => {
// setIsLoading (true);
// // console.log(firstName, lastName, email, password, imageUri)
// try {
// const {user} = await auth().createUserWithEmailAndPassword(
//  email, password
// );
// // console.log("THIS IS SIGNUP" ,user)
// let photoURL = null;
// if (imageUri) {
//   // console.log("TIS SHOULD")
//   photoURL = await uploadImageToFirebase(imageUri, user.uid);
// }
// dispatch(saveUser({
//     displayName: `${firstName} ${lastName}`,
//     uid: user.uid,
//     email: user.email,
//     photoURL,
//     provider : PROVIDER.EMAIL
// }));


// await addDocumentsForUser(user.uid);

// await user.updateProfile({
//             displayName: `${firstName} ${lastName}`,
//             photoURL: photoURL,  
//         });
//         // console.log("THIS IS SIGNUP ENDD" ,user)
// } catch (err) { 
//     Alert.alert(`${err.message}`);
// } finally {
// setIsLoading (false);
// }
// };

// const uploadImageToFirebase = async (imageUri, userId) => {
//   const storageRef = storage().ref(`profile_images/${userId}.jpg`);
//   const response = await fetch(imageUri);
//   const blob = await response.blob();
//   await storageRef.put(blob);
//   const downloadURL = await storageRef.getDownloadURL();
//   // await firestore().collection('users').doc(userId).set({
//   //   profileImage: downloadURL,
//   // }, { merge: true });
//   // console.log(downloadURL,"DOWBLOAd")
//   return downloadURL;
// };

// const uploadImageToFirebase = async (imageUri, userId) => {
//   // setUploading(true)
//   const response = await fetch(imageUri)
//   const blob = response.blob()
//   const filename = image.uri.substring(image.uri.lastIndexOf('/')+1)
//   var ref = storage().ref().child(filename).put(blob)
//   try {
//       await ref;
//   } catch (e){
//       console.log(e)
//   }
//   // setUploading(false)
//   console.log(
//       'Photo uploaded!'
//   );
//   // setImage(null);
// } 