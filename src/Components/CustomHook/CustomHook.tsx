import React, {useState, useEffect, useRef} from 'react';
import {useReduxDispatch, useReduxSelector} from '../../Redux/Store/store';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {clearUserData, saveUser} from '../../Redux/Slices/demoSlice';
import {addDocumentsForUser} from '../../Common/firebaseUtils';
import {Alert} from 'react-native';
import {PROVIDER} from '../../Constants/signingConstants';
import { SignInProps, SignUpProps, UploadImageProps } from '.';
import { handleAuthError } from '../../Common/handleAuthErr';

export default function useAuthentication() {
  const dispatch = useReduxDispatch();
  const myProvider = useReduxSelector(state => state.user.provider);
  const {displayName, uid, email, theme} = useReduxSelector(
    state => state.user,
  );
  const [isLoading, setIsLoading] = useState(false);

  const signInCall = async ({email, password}: SignInProps) => {
    setIsLoading(true);
    try {
      const {user}: {user: FirebaseAuthTypes.User} =
        await auth().signInWithEmailAndPassword(email, password);
      if (user) {
        dispatch(
          saveUser({
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            provider: PROVIDER.EMAIL,
            theme
          }),
        );
      }
    } catch (e) {
      handleAuthError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const signUpCall = async ({
    email,
    password,
    firstName,
    lastName,
    imageUri,
  }: SignUpProps) => {
    setIsLoading(true);
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      let photoURL = null;
      if (imageUri) {
        photoURL = await uploadImageToFirebase({ imageUri, userId: user.uid });
      }

      await user.updateProfile({
        displayName: `${firstName} ${lastName}`,
        photoURL: photoURL,
      });


      if (email)
        dispatch(
          saveUser({
            displayName: `${firstName} ${lastName}`,
            uid: user.uid,
            email: user.email,
            photoURL,
            provider: PROVIDER.EMAIL,
            theme
          }),
        );

      await addDocumentsForUser(user.uid);

    } catch (err:any) {
      if (err.code === 'auth/email-already-in-use') {
        Alert.alert('Error signing up', 'The email address is already in use');
      } else if (err.code === 'auth/network-request-failed') {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection and try again.',
        );
      } else Alert.alert('Error signing up', `${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageToFirebase = async ({
    imageUri,
    userId,
  }: UploadImageProps) => {
    const storageRef = storage().ref(`profile_images/${userId}.jpg`);
    const response = await fetch(imageUri);
    const blob = await response.blob();
    await storageRef.put(blob);
    const downloadURL = await storageRef.getDownloadURL();
    return downloadURL;
  };

  const deletePhoto = async () => {
    setIsLoading(true);
    try {
      const storageRef = storage().ref(`profile_images/${uid}.jpg`);
      await storageRef.delete();
        await auth().currentUser?.updateProfile({photoURL: null});
      dispatch(
        saveUser({
          displayName,
          uid,
          email,
          photoURL: '',
          provider: myProvider,
          theme: theme,
        }),
      );
    } catch (error) {
      console.error('Error deleting photo: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOutCall = async () => {
    setIsLoading(true);
    try {
      if (myProvider === PROVIDER.GOOGLE) {
        await GoogleSignin.signOut();
      } else {
        await auth().signOut();
      }
      dispatch(clearUserData());
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
      const {user, additionalUserInfo} = await auth().signInWithCredential(
        credential,
      );
      dispatch(
        saveUser({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          provider: PROVIDER.GOOGLE,
          theme
        }),
      );

      if (additionalUserInfo && additionalUserInfo.isNewUser) {
        await addDocumentsForUser(user.uid);
      }

    } catch (error:any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Google Sign-In Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        Alert.alert(error);
      }
    }
  };

  return {
    isLoading,
    signInCall,
    signUpCall,
    signOutCall,
    googleLoginCall,
    uploadImageToFirebase,
    deletePhoto,
  };
}
