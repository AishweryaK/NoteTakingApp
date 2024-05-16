import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
// import StackNavigation from './src/Navigation';
import StackNavigation from './src/Navigation/rootNav';
import { APPCOLOR } from './src/Assets/Colors/appColors';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { saveUser } from './src/Redux/Slices/demoSlice';

function App(){
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // const getToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log(token, "token")
  // }

  // useEffect (()=> {
  //   requestUserPermission();
  //   getToken();
  // },[])


  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((userInfo) => {
      if (userInfo) {
        console.log("YE HAI USERINFOOO", userInfo)
        const { displayName, uid, email, photoURL } = userInfo;
      dispatch(saveUser({ displayName, uid, email, photoURL }));
        // dispatch(saveUser(userInfo));
      } else {
        dispatch(saveUser({}));
      }
    });
    return unsubscribe;
  }, [dispatch]);
  
  return (
    
    <SafeAreaView style={styles.container} >
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:APPCOLOR.BACKGROUND,
  },
});

export default App;
