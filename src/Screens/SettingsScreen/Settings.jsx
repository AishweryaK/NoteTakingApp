import React from 'react';
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

const SettingsPage = ({ navigation }) => {
  const { isLoading, signOutCall } = useAuthentication();
  const theme = useSelector(state => state.user.theme);
  const dispatch = useDispatch();
    
  const handleLogout = async () => {
    await signOutCall();
  };

  const toggleSwitch = () => {
    dispatch(toggleTheme());
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate(NAVIGATION.ACCOUNT)}>
        {ICONS.ACCOUNT(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText}>Account</Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        {ICONS.CHANGEP(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText}>Change Password</Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        {ICONS.THEME(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText}>Theme</Text>
          <Switch
            style={{ paddingRight: 0 }}
            trackColor={{ false: APPCOLOR.ICON, true: APPCOLOR.BLUE }}
            thumbColor={theme === "DARK" ? APPCOLOR.ICON : APPCOLOR.ICONFOCUSED}
            onValueChange={toggleSwitch}
            value={theme === "DARK"}
          />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.option, { marginTop: 40 }]} onPress={handleLogout}>
        {ICONS.LOGOUT(24, 24)}
        <View style={styles.view}>
          <Text style={[styles.optionText, { fontFamily: FONT.BOLD }]}>Logout</Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>
      {ICONS.EYEON(24,24)}
      {ICONS.EYEOFF(24,24)}
      {ICONS.EYE(24,24)}
    </ScrollView>
  );
};

export default SettingsPage;
