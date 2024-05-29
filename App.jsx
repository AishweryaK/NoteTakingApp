import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
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

function App(){
  const theme = useSelector((state)=> state.user.theme)
  const colors = getThemeColors(theme);

  // useEffect(()=>{
  //   if(Platform.OS==="android")
  //   SplashScreen.hide();
  // },[])

  return (

    <SafeAreaView style={styles.container(colors)} >
      <StatusBar backgroundColor={colors.BACKGROUND}
      barStyle= {theme === "LIGHT" ? "dark-content" : "light-content"}
      />
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
