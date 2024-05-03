import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import StackNavigation from './src/Navigation';
import StackNavigation from './src/Navigation/authNav';
import BottomNavigation from './src/Navigation/bottomTab';
import { APPCOLOR } from './src/Assets/Colors/appColors';

function App(): React.JSX.Element {
  
  return (
    
    <View style={styles.container} >
      <NavigationContainer>
        <StackNavigation />
        {/* <BottomNavigation /> */}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:APPCOLOR.BACKGROUND,
  },
});

export default App;
