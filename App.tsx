import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/Navigation/rootNav';
import {getThemeColors} from './src/Assets/Colors/themeColors';
import NetInfo from '@react-native-community/netinfo';
import {netConnection} from './src/Redux/Slices/internetSlice';
import OfflineSign from './src/Components/InternetConn/InternetConn';
import {useReduxDispatch, useReduxSelector} from './src/Redux/Store/store';
import { styles } from './src/Common/styles';
import { THEME } from './src/Constants/strings';

function App() {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const [internet, setInternet] = useState<boolean>(false);
  const dispatch = useReduxDispatch();
  const connection = useReduxSelector(state => state.internet.connection);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      ({isConnected, isInternetReachable}) => {
        const connectionStatus =
          Boolean(isConnected) && Boolean(isInternetReachable);
        if (internet != connectionStatus) {
          setInternet(connectionStatus);
          dispatch(netConnection({connection: connectionStatus}));
        }
      },
    );

    return unsubscribe;
  }, [dispatch, internet]);

  return (
    <SafeAreaView style={styles.container(colors)}>
      <StatusBar
        backgroundColor={colors.BACKGROUND}
        barStyle={theme === THEME.LIGHT ? 'dark-content' : 'light-content'}
      />
      {!connection && <OfflineSign />}
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;