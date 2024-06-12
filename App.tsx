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
  ViewStyle,
} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/rootNav';
import { getThemeColors } from './src/Assets/Colors/themeColors';
import NetInfo from '@react-native-community/netinfo';
import { netConnection } from './src/Redux/Slices/internetSlice';
import OfflineSign from './src/Components/InternetConn';
import { useReduxDispatch, useReduxSelector } from './src/Redux/Store/store';

interface Styles {
 colors: any;
}

const styles = StyleSheet.create<Styles>({
  container: (colors) => ({
    flex:1,
    backgroundColor:colors.BACKGROUND,
  }),
});


function App(){
  const theme = useReduxSelector((state)=> state.user.theme)
  const colors = getThemeColors(theme); 
  const [internet, setInternet] = useState(false)
  const dispatch =useReduxDispatch();
  const connection = useReduxSelector(state=> state.internet.connection);

  // useEffect(()=>{
  //   if(Platform.OS==="android")
  //   SplashScreen.hide();
  // },[])

  // useEffect(()=>{

  // },[internet])

    useEffect(()=>{
      const unsubscribe= NetInfo.addEventListener(
      ({ isConnected, isInternetReachable}) => {
        const connectionStatus =Boolean(isConnected) && Boolean(isInternetReachable);
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

export default App;


// import React, { useEffect, useState } from 'react';
// import {
//   Platform,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   ViewStyle,
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import StackNavigation from './src/Navigation/rootNav';
// import { getThemeColors } from './src/Assets/Colors/themeColors';
// import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
// import { netConnection } from './src/Redux/Slices/internetSlice';
// import OfflineSign from './src/Components/InternetConn';
// import { useReduxDispatch, useReduxSelector } from './src/Redux/Store/store';

// // Define types for theme and colors
// interface ThemeColors {
//   BACKGROUND: string;
//   [key: string]: string;
// }

// interface Styles {
//   container: (colors: ThemeColors) => ViewStyle;
// }

// function App() {
//   const theme = useReduxSelector((state) => state.user.theme);
//   const colors = getThemeColors(theme) as ThemeColors;
//   const [internet, setInternet] = useState(false);
//   const dispatch = useReduxDispatch();
//   const connection = useReduxSelector(state => state.internet.connection);

//   useEffect(() => {
//     const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
//       const connectionStatus = Boolean(state.isConnected) && Boolean(state.isInternetReachable);
//       if (internet !== connectionStatus) {
//         setInternet(connectionStatus);
//         dispatch(netConnection({ connection: connectionStatus }));
//       }
//     });

//     return unsubscribe;
//   }, [dispatch, internet]);

//   return (
//     <SafeAreaView style={styles.container(colors)}>
//       <StatusBar
//         backgroundColor={colors.BACKGROUND}
//         barStyle={theme === "LIGHT" ? "dark-content" : "light-content"}
//       />
//       {!connection && <OfflineSign />}
//       <NavigationContainer>
//         <StackNavigation />
//       </NavigationContainer>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create<Styles>({
//   container: (colors) => ({
//     flex: 1,
//     backgroundColor: colors.BACKGROUND,
//   }),
// });

// export default App;