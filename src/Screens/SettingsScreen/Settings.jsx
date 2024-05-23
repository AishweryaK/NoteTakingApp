import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { ICONS } from '../../Constants/iconConstants';
import { FONT } from '../../Constants/fontConstants';
import { APPCOLOR } from '../../Assets/Colors/appColors';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';
import useAuthentication from '../../Components/CustomHook';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../Redux/Slices/demoSlice';
import { getThemeColors, themeColors } from '../../Assets/Colors/themeColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const SettingsPage = ({ navigation }) => {
  const { isLoading, signOutCall } = useAuthentication();
  const theme = useSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const dispatch = useDispatch();

  //   useEffect (() => {
  //   AsyncStorage.clear();
  //   console.log("HEHEHEHEHEHEH");
  // },[])

  useEffect(() => {
    GoogleSignin
      .configure(
        {
        webClientId:
        '630539047377-kfbbhc2l502b6gh679v5v7el4b618vou.apps.googleusercontent.com',
      } 
      );
  }, []);
    
  const handleLogout = async () => {
    await signOutCall();
  };

  const toggleSwitch = () => {
    dispatch(toggleTheme());
  };

  return (
    <ScrollView style={styles.container(colors)}>
      <Text style={styles.heading(colors)}>Settings</Text>

      <TouchableOpacity style={styles.option(colors)} onPress={() => navigation.navigate(NAVIGATION.ACCOUNT)}>
        {ICONS.ACCOUNT(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>Account</Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option(colors)}>
        {ICONS.CHANGEP(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>Change Password</Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>

      <View style={styles.option(colors)}>
        {ICONS.THEME(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>Theme</Text>
          <Switch
            style={{ paddingRight: 0 }}
            trackColor={{ false: themeColors.LIGHT.ICON, true: themeColors.LIGHT.BLUE }}
            thumbColor={theme === "DARK" ? themeColors.LIGHT.ICON : themeColors.LIGHT.ICONFOCUSED}
            onValueChange={toggleSwitch}
            value={theme === "DARK"}
          />
        </View>
      </View>
      
      <TouchableOpacity style={[styles.option(colors), { marginTop: 40 }]} onPress={handleLogout}>
        {ICONS.LOGOUT(24, 24)}
        <View style={styles.view}>
          <Text style={[styles.optionText(colors), { fontFamily: FONT.BOLD }]}>Logout</Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsPage;
