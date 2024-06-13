import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ICONS } from '../../Constants/iconConstants';
import auth from '@react-native-firebase/auth';
import { styles } from '../SettingsScreen/styles';
import { useReduxDispatch, useReduxSelector } from '../../Redux/Store/store';
import ProfileImage from '../../Components/ProfileImage/ProfileImage';
import { getThemeColors } from '../../Assets/Colors/themeColors';
import useAuthentication from '../../Components/CustomHook/CustomHook';
import { saveUser } from '../../Redux/Slices/demoSlice';
import NameChange from './NameChange';

const AccountPage: React.FC = () => {
  const dispatch = useReduxDispatch();
  const { displayName, theme, photoURL, uid, email, provider } = useReduxSelector(state => state.user);
  const colors = getThemeColors(theme);
  const [imageUri, setImageUri] = useState<string | null>(photoURL);
  const { uploadImageToFirebase, deletePhoto } = useAuthentication();
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
      Alert.alert("No Internet Connection", "Please check your internet connection and try again.");
    }
  }

  const closeChangeNameModal = () => {
    setModalVisible(false);
  }

  const updateUserProfile = async (uri: string | null) => {
    try {
      if (uri === "") {
        await deletePhoto();
      } else if (uri) {
        const newPhotoURL = await uploadImageToFirebase({ imageUri: uri, userId: uid });
        await auth().currentUser?.updateProfile({ photoURL: newPhotoURL });
        dispatch(saveUser({ displayName, uid, email, photoURL: newPhotoURL, provider, theme }));
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <ScrollView style={styles.container(colors)}>
      <ProfileImage onImageChange={handleImageChange} />
      <View style={{ paddingTop: 40 }}>
        <View style={[styles.option(colors), styles.indent]}>
          {ICONS.ACCOUNT(24, 24)}
          <View style={styles.view}>
            <Text style={styles.optionText(colors)}>{displayName}</Text>
          </View>
          <TouchableOpacity style={{ paddingLeft: 20 }} onPress={openChangeNameModal}>
            {ICONS.EDIT(24, 24)}
          </TouchableOpacity>
        </View>
        <View style={[styles.option(colors), styles.indent]}>
          {ICONS.MAIL(24, 24)}
          <View style={styles.view}>
            <Text style={styles.optionText(colors)}>{email}</Text>
          </View>
        </View>
      </View>
      <NameChange visible={modalVisible} onClose={closeChangeNameModal} />
    </ScrollView>
  );
};

export default AccountPage;
