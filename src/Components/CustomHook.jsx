import {useState} from "react";
import {useDispatch} from "react-redux";
import auth from '@react-native-firebase/auth';
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { clearUserData, saveUser } from "../Redux/Slices/demoSlice"; 
import { addDocumentsForUser } from "../Common/firebaseUtils";


export default function useAuthentication() {
const dispatch = useDispatch();
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
    photoURL: user.photoURL
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
    photoURL: imageUri
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
setIsLoading (true);
try {
await auth().signOut();
dispatch (clearUserData());
console.log("user signed out!")
} catch (err) {
console.log(err);
} finally {

setIsLoading (false);
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
                photoURL: user.photoURL
            }));

        if(additionalUserInfo.isNewUser) {
            console.log("inside if");
            await addDocumentsForUser(user.uid);
           }
    
              
              console.log('User account created & signed in!', user);
    
            //   navigation.navigate(NAVIGATION.HOMESCREEN);
    
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

return {isLoading, signInCall, signUpCall, signOutCall, googleLoginCall};
}