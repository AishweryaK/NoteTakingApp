import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
} from 'react-native';
import {ICONS} from '../../Constants/iconConstants';
import {FONT} from '../../Constants/fontConstants';
import {styles} from './styles';
import {NAVIGATION} from '../../Constants/navConstants';
import useAuthentication from '../../Components/CustomHook/authHook';
import {useReduxDispatch, useReduxSelector} from '../../Redux/Store/store';
import {toggleTheme} from '../../Redux/Slices/userSlice';
import {getThemeColors, themeColors} from '../../Assets/Colors/themeColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import ChangePasswordModal from '../ChangePassword/ChangePScreen';
import {showStyles} from '../ShowNotes/styles';
import {SettingsScreenProps} from '../../Navigation/routeTypes';
import {
  CHANGE_PASSWORD,
  CLIENT_ID,
  CONSTANTS,
  ERR_MSG,
  ERR_TITLE,
  SETTINGS,
  THEME,
  TITLE,
} from '../../Constants/strings';
import {showAlert} from '../../Common/alert';

const SettingsPage = ({navigation}: SettingsScreenProps) => {
  const {isLoading, signOutCall} = useAuthentication();
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const dispatch = useReduxDispatch();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const connection = useReduxSelector(state => state.internet.connection);

  //   useEffect (() => {
  //   AsyncStorage.clear();
  //   console.log("CLEARED");
  // },[])

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID.WEB,
    });
  }, []);

  const handleLogoutModal = () => {
    setLogoutModal(true);
  };

  const handleLogout = async () => {
    await signOutCall();
    setLogoutModal(false);
  };

  const toggleSwitch = () => {
    dispatch(toggleTheme());
  };

  const openChangePasswordModal = () => {
    if (connection) setModalVisible(true);
    else showAlert(ERR_TITLE.INTERNET, ERR_MSG.REQUEST_FAILED);
  };

  const closeChangePasswordModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container(colors)}>
      <Text style={styles.heading(colors)}>{SETTINGS.SETTINGS}</Text>

      <TouchableOpacity
        style={styles.option(colors)}
        onPress={() => navigation.navigate(NAVIGATION.ACCOUNT)}>
        {ICONS.ACCOUNT(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>{SETTINGS.ACCOUNT}</Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option(colors)}
        onPress={openChangePasswordModal}>
        {ICONS.CHANGEP(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>
            {CHANGE_PASSWORD.CHANGE}
          </Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>

      <View style={styles.option(colors)}>
        {ICONS.THEME(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>{SETTINGS.THEME}</Text>
          <Switch
            style={{paddingRight: 0}}
            trackColor={{
              false: themeColors.LIGHT.ICON,
              true: themeColors.LIGHT.BLUE,
            }}
            thumbColor={
              theme === THEME.DARK
                ? themeColors.LIGHT.ICON
                : themeColors.LIGHT.ICONFOCUSED
            }
            onValueChange={toggleSwitch}
            value={theme === THEME.DARK}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.option(colors)]}
        onPress={handleLogoutModal}>
        {ICONS.LOGOUT(24, 24)}
        <View style={styles.view}>
          <Text style={[styles.optionText(colors), {fontFamily: FONT.BOLD}]}>
            {TITLE.LOGOUT}
          </Text>
          {ICONS.ARROW(24, 24)}
        </View>
      </TouchableOpacity>
      <ChangePasswordModal
        visible={isModalVisible}
        onClose={closeChangePasswordModal}
      />
      <Modal visible={logoutModal} transparent={true} animationType="slide">
        <View style={showStyles.modalBackground}>
          <View style={showStyles.modalContainer(colors)}>
            <Text style={showStyles.modalTitle(colors)}>{TITLE.LOGOUT}</Text>
            <Text style={showStyles.modalMessage(colors)}>
              {SETTINGS.ARE_YOU_SURE}
            </Text>
            <View style={showStyles.modalButtons}>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={showStyles.modalText(colors)}>
                  {CONSTANTS.YES}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setLogoutModal(false)}>
                <Text style={showStyles.modalText(colors)}>{CONSTANTS.NO}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SettingsPage;
