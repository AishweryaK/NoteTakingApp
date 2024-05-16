import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ICONS } from '../../Constants/iconConstants';
import { FONT } from '../../Constants/fontConstants';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';
import useAuthentication from '../../Components/CustomHook';

const SettingsPage = ({navigation}) => {
  const {isLoading, signOutCall} = useAuthentication();
    
    const handleLogout =async () => {
        // auth().signOut().then(() => {
        //     navigation.navigate(NAVIGATION.WALKTHROUGH)
        //     console.log("user signed out!")
        //      }).catch((error) => {
        //        console.log("some err", error)
        //      });
        await signOutCall();


    }

    // const handleAccount = () => {

    // }


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity style={styles.option}
      onPress={()=> navigation.navigate(NAVIGATION.ACCOUNT)}
      >
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
        {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.option, {marginTop:40}]}
      onPress={handleLogout}>
      {ICONS.LOGOUT(24, 24)}
      <View style={styles.view}>
        <Text style={[styles.optionText, {fontFamily:FONT.BOLD}]}>Logout</Text>
        {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
};



export default SettingsPage;
