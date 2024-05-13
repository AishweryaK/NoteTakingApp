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
import { NavigationContainer } from '@react-navigation/native';
// import StackNavigation from './src/Navigation';
import StackNavigation from './src/Navigation/authNav';
import { APPCOLOR } from './src/Assets/Colors/appColors';
import messaging from '@react-native-firebase/messaging';

function App(): React.JSX.Element {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log(token, "token")
  }

  useEffect (()=> {
    requestUserPermission();
    getToken();
  },[])
  
  return (
    
    <SafeAreaView style={styles.container} >
      {/* <View style={styles.container} > */}
      <NavigationContainer>
        <StackNavigation />
        {/* <BottomNavigation /> */}
      </NavigationContainer>
    {/* </View> */}
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
