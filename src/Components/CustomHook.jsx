import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import auth from '@react-native-firebase/auth';
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
console.log(user.displayName, "THIS IS CUSTOMHOOK LOGIN")
dispatch(saveUser({
    displayName: user.displayName,
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    provider: PROVIDER.EMAIL
}));
} catch (err) {
console.log(err);
} finally {
setIsLoading(false);
}
};

const signUpCall = async ({email, password, firstName, lastName, imageUri}) => {
setIsLoading (true);
console.log(firstName, lastName, email, password, imageUri)
try {
const {user} = await auth().createUserWithEmailAndPassword(
 email, password
);
console.log("THIS IS SIGNUP" ,user)
dispatch(saveUser({
    displayName: `${firstName} ${lastName}`,
    uid: user.uid,
    email: user.email,
    photoURL: imageUri,
    provider : PROVIDER.EMAIL
}));


await addDocumentsForUser(user.uid);

await user.updateProfile({
            displayName: `${firstName} ${lastName}`,
            photoURL: imageUri,  
        });
} catch (err) { 
    console.log(err);
} finally {
setIsLoading (false);
}
};

  const signOutCall = async () => {
    setIsLoading(true);
    try {
        if (myProvider === PROVIDER.GOOGLE) {
          console.log("ffurhnfernhgrubveurbfv INSIDE IF")
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            
        }
        await auth().signOut();

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
                provider: PROVIDER.GOOGLE
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

return {isLoading, signInCall, signUpCall, signOutCall, googleLoginCall};
}