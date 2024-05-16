import {useState} from "react";
import {useDispatch} from "react-redux";
// import {
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword,
//     signOut,} from "firebase/auth";
import auth from '@react-native-firebase/auth';
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
console.log(user, "THIS IS CUSTOMHOOK LOGIN")
dispatch(saveUser(user));
} catch (err) {
console.log(err);
} finally {
setIsLoading(false);
}
};

const signUpCall = async ({email, password, firstName, lastName, imageUri}) => {
setIsLoading (true);
try {
const {user} = await auth().createUserWithEmailAndPassword(
 email, password
);
console.log("THIS IS SIGNUP" ,user, "THIS IS SIGNUP")
dispatch(saveUser(user));

await addDocumentsForUser(user.uid);

await userCredentials.user.updateProfile({
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

return {isLoading, signInCall, signUpCall, signOutCall};
}