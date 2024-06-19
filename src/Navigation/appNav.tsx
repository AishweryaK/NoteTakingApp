import React from 'react';
import { TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATION} from '../Constants/navConstants';
import AddNote from '../Screens/AddNoteScreen/AddNote';
import NotesScreen from '../Screens/ShowNotes/ShowNotes';
import HomeNavigation from './bottomTab';
import {RootStackParamsList} from './routeTypes';
import {FONT} from '../Constants/fontConstants';
import AccountPage from '../Screens/Account/AccountScreen';
import {getThemeColors} from '../Assets/Colors/themeColors';
import {TITLE} from '../Constants/strings';
import {useReduxSelector} from '../Redux/Store/store';
import { ICONS } from '../Constants/iconConstants';

function AppNavigation(): React.JSX.Element {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const Stack = createNativeStackNavigator<RootStackParamsList>();
  return (
    <Stack.Navigator
      initialRouteName={NAVIGATION.HOMESCREEN}
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
      <Stack.Screen name={NAVIGATION.HOMESCREEN} component={HomeNavigation} />
      <Stack.Screen
        name={NAVIGATION.ADDNOTE}
        component={AddNote}
        options={{
          headerShown: true,
          title: TITLE.ADDNOTE,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={NAVIGATION.NOTESCREEN}
        component={NotesScreen}
        options={({route}) => ({
          // title: route.params.itemText,
          headerShown: true,
          headerBackTitleVisible: false,
          // headerRight: () => (
          //   <TouchableOpacity>
          //     {ICONS.MENU(25,25,colors.HEADERTITLE)}
          //   </TouchableOpacity>
          // ),
        })}
      />
      <Stack.Screen
        name={NAVIGATION.ACCOUNT}
        component={AccountPage}
        options={{
          headerShown: true,
          title: TITLE.USERACCOUNT,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
