import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NAVIGATION} from '../Constants/navConstants';
import Home from '../Screens/HomeScreen/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from '../Screens/SettingsScreen/Settings';
import {dimensions} from '../Constants/utility';
import {homeStyles} from '../Screens/HomeScreen/homeStyle';
import {ICONS} from '../Constants/iconConstants';
import Lamp from '../Screens/DummyScreens/Lamp';
import CheckList from '../Screens/DummyScreens/CheckList';
import {useReduxSelector} from '../Redux/Store/store';
import {getThemeColors} from '../Assets/Colors/themeColors';
import {TITLE} from '../Constants/strings';
import {HomeScreenProps} from './routeTypes';
import { bottomTabStyles } from '../Common/styles';

function HomeNavigation({navigation}: HomeScreenProps) {
  const Tab = createBottomTabNavigator();
  const uid = useReduxSelector(state => state.user.uid);
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  const DummyAddNote = () => {
    return null;
  };

  const handleAddNote = () => {
    if (uid)
      navigation.navigate(NAVIGATION.ADDNOTE, {
        uid: uid,
        itemTitle: '',
        itemDesc: '',
      });
  };

  return (
    <View
      style={bottomTabStyles.view(colors)}>
      <Tab.Navigator
        initialRouteName={NAVIGATION.HOME}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if (rn === NAVIGATION.HOME) {
              iconName = focused ? ICONS.NOTEFD(24, 24) : ICONS.NOTE(24, 24);
            } else if (rn === NAVIGATION.CHECKLIST) {
              iconName = focused
                ? ICONS.CHECKLISTFD(24, 24)
                : ICONS.CHECKLIST(24, 24);
            } else if (rn === NAVIGATION.LAMP) {
              iconName = focused ? ICONS.LAMPFD(24, 24) : ICONS.LAMP(24, 24);
            } else if (rn === NAVIGATION.SETTINGS) {
              iconName = focused
                ? ICONS.SETTINGSFD(24, 24)
                : ICONS.SETTINGS(24, 24);
            }

            return iconName;
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.BOTTOM,
            borderRadius: 20,
            justifyContent: 'center',
            marginHorizontal: 16,
            height: dimensions.height * 0.073,
          },
        })}>
        <Tab.Screen name={NAVIGATION.HOME} component={Home} />
        <Tab.Screen name={NAVIGATION.CHECKLIST} component={CheckList} />

        <Tab.Screen
          name={TITLE.SOMETHING}
          component={DummyAddNote}
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                onPress={handleAddNote}
                style={homeStyles.buttonShadow(colors)}>
                {ICONS.ADD(30, 30)}
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen name={NAVIGATION.LAMP} component={Lamp} />
        <Tab.Screen name={NAVIGATION.SETTINGS} component={Settings} />
      </Tab.Navigator>
    </View>
  );
}

export default HomeNavigation;
