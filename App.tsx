import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import StackNavigation from './src/Navigation';
import BottomNavigation from './src/Navigation/bottomTab';

function App(): React.JSX.Element {
  
  return (
    <SafeAreaView style={styles.container} >
      <NavigationContainer>
        <StackNavigation />
        {/* <BottomNavigation /> */}
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
});

export default App;
