import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ICONS } from '../../Constants/iconConstants';
import { FONT } from '../../Constants/fontConstants';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';


// ICONS.NOTEFD(24, 24, color)

const SettingsPage = ({navigation}) => {
    
    const handleLogout = () => {
        auth().signOut().then(() => {
            navigation.navigate(NAVIGATION.WALKTHROUGH)
            console.log("user signed out!")
             }).catch((error) => {
               console.log("some err", error)
             });
    }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <TouchableOpacity style={styles.option}>
      {ICONS.ACCOUNT(24, 24)}
        <Text style={styles.optionText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
      {ICONS.CHANGEP(24, 24)}
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
      {ICONS.THEME(24, 24)}
        <Text style={styles.optionText}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.option, {marginTop:40}]}
      onPress={handleLogout}
      >
      {ICONS.LOGOUT(24, 24)}
        <Text style={[styles.optionText, {fontFamily:FONT.BOLD}]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};



export default SettingsPage;
