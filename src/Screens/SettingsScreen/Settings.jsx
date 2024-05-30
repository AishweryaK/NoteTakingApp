import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Modal } from 'react-native';
import { ICONS } from '../../Constants/iconConstants';
import { FONT } from '../../Constants/fontConstants';
import { styles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';
import useAuthentication from '../../Components/CustomHook';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../Redux/Slices/demoSlice';
import { getThemeColors, themeColors } from '../../Assets/Colors/themeColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ChangePasswordModal from '../ChangePassword/ChangePScreen';
import { showStyles } from '../ShowNotes/styles';

const SettingsPage = ({ navigation }) => {
  const { isLoading, signOutCall } = useAuthentication();
  const theme = useSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  //   useEffect (() => {
  //   AsyncStorage.clear();
  //   console.log("CLEARED");
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
    
  const handleLogoutModal =() => {
    // await signOutCall();
    setLogoutModal(true);
  };

  const handleLogout = async ()=>{
    await signOutCall();
    setLogoutModal(false);
  }

  const toggleSwitch = () => {
    dispatch(toggleTheme());
  };

  const openChangePasswordModal = () => {
    setModalVisible(true);
  };

  const closeChangePasswordModal = () => {
    setModalVisible(false);
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
      <TouchableOpacity style={styles.option(colors)} onPress={openChangePasswordModal}>
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
      
      <TouchableOpacity style={[styles.option(colors)]} onPress={handleLogoutModal}>
        {ICONS.LOGOUT(24, 24)}
        <View style={styles.view}>
          <Text style={[styles.optionText(colors), { fontFamily: FONT.BOLD }]}>Logout</Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>
      <ChangePasswordModal visible={isModalVisible} onClose={closeChangePasswordModal} />
      <Modal
        visible={logoutModal}
        transparent={true}
        animationType="slide"
      >
        <View style={showStyles.modalBackground}>
          <View style={showStyles.modalContainer(colors)}>
            <Text style={showStyles.modalTitle(colors)}>Logout</Text>
            <Text style={showStyles.modalMessage(colors)}>Are you sure you want to logout?</Text>
            <View style={showStyles.modalButtons}>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={showStyles.modalText(colors)}>Yes</Text>
                </TouchableOpacity>
              <TouchableOpacity  onPress={() => setLogoutModal(false)} >
              <Text style={showStyles.modalText(colors)}>No</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SettingsPage;
