import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/rootNav';
import { useDispatch, useSelector } from 'react-redux';
import { getThemeColors } from './src/Assets/Colors/themeColors';
import NetInfo from '@react-native-community/netinfo';
import { netConnection } from './src/Redux/Slices/internetSlice';
import OfflineSign from './src/Components/InternetConn';


function App(){
  const theme = useSelector((state)=> state.user.theme)
  const colors = getThemeColors(theme);
  const [internet, setInternet] = useState(false)
  const dispatch =useDispatch();
  const connection = useSelector(state=> state.internet.connection);

  // useEffect(()=>{
  //   if(Platform.OS==="android")
  //   SplashScreen.hide();
  // },[])

  // useEffect(()=>{

  // },[internet])

    useEffect(()=>{
      const unsubscribe= NetInfo.addEventListener(
      ({ isConnected, isInternetReachable, type, detail }) => {
        const connectionStatus = isConnected && isInternetReachable;
        if(internet!=connectionStatus) {
          setInternet(connectionStatus);
          dispatch(netConnection({ connection: connectionStatus }));
        }
      }
      
    );
    
    return unsubscribe;
  },[dispatch,internet])

  return (

    <SafeAreaView style={styles.container(colors)} >
        
      <StatusBar backgroundColor={colors.BACKGROUND}
      barStyle= {theme === "LIGHT" ? "dark-content" : "light-content"}
      />
      { !connection &&
            <OfflineSign />
        }
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
      </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: (colors) => ({
    flex:1,
    backgroundColor:colors.BACKGROUND,
  }),
});

export default App;
