import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATION} from '../Constants/navConstants';
import {FONT} from '../Constants/fontConstants';
import AppNavigation from './appNav';
import AuthNavigation from './authNav';
import {useReduxSelector} from '../Redux/Store/store';
import {getThemeColors} from '../Assets/Colors/themeColors';
import {TITLE} from '../Constants/strings';

function StackNavigation() {
  const Stack = createNativeStackNavigator();
  const {theme, uid} = useReduxSelector(state => state.user);
  const colors = getThemeColors(theme);

  return (
    <Stack.Navigator
      initialRouteName={uid ? NAVIGATION.HOMESCREEN : NAVIGATION.WALKTHROUGH}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: colors.BACKGROUND,
        },
        headerShadowVisible: false,
        headerTintColor: colors.HEADERTITLE,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: FONT.BOLD,
          fontSize: 18,
        },
      }}>
      <Stack.Screen
        name={TITLE.APP}
        component={uid ? AppNavigation : AuthNavigation}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
