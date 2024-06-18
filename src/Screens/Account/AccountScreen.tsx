import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {ICONS} from '../../Constants/iconConstants';
import {styles} from '../SettingsScreen/styles';
import {useReduxSelector} from '../../Redux/Store/store';
import ProfileImage from '../../Components/ProfileImage/ProfileImage';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import NameChange from './NameChange';
import {showAlert} from '../../Common/alert';
import {ERR_CONSOLE, ERR_MSG, ERR_TITLE} from '../../Constants/strings';
import {PROVIDER} from '../../Constants/signingConstants';
import useFirebaseUtils from '../../Components/CustomHook/profileHooks';

const AccountPage: React.FC = () => {
  const {displayName, theme, photoURL, uid, email, provider} = useReduxSelector(
    state => state.user,
  );
  const colors = getThemeColors(theme);
  const [imageUri, setImageUri] = useState<string | null>(photoURL);
  const {updateUserProfile} = useFirebaseUtils();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const connection = useReduxSelector(state => state.internet.connection);

  useEffect(() => {
    if (imageUri !== photoURL) {
      updateUserProfile(imageUri);
    }
  }, [imageUri]);

  const handleImageChange = async (uri: string) => {
    setImageUri(uri);
  };

  const openChangeNameModal = () => {
    if (connection) {
      setModalVisible(true);
    } else {
      showAlert(ERR_TITLE.INTERNET, ERR_MSG.REQUEST_FAILED);
    }
  };

  const closeChangeNameModal = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container(colors)}>
      <ProfileImage onImageChange={handleImageChange} />
      <View style={[styles.option(colors), styles.indent]}>
        {ICONS.ACCOUNT(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>{displayName}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={openChangeNameModal}>
          {provider === PROVIDER.EMAIL && ICONS.EDIT(24, 24)}
        </TouchableOpacity>
      </View>
      <View style={[styles.option(colors), styles.indent]}>
        {ICONS.MAIL(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>{email}</Text>
        </View>
      </View>
      <NameChange visible={modalVisible} onClose={closeChangeNameModal} />
    </ScrollView>
  );
};

export default AccountPage;
