import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { ICONS } from '../../Constants/iconConstants';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {styles} from '../SettingsScreen/styles';
import { NAVIGATION } from '../../Constants/navConstants';
import { useDispatch, useSelector } from 'react-redux';
import ProfileImage from '../../Components/ProfileImage';
import { getThemeColors } from '../../Assets/Colors/themeColors';
import useAuthentication from '../../Components/CustomHook';
import { saveUser } from '../../Redux/Slices/demoSlice';
import { SignupSchema } from '../SignupScreen/Signup';
import * as Yup from 'yup';
import NameChange from './NameChange';



const AccountPage = ({navigation}) => {
const dispatch = useDispatch();
const {displayName, theme, photoURL, uid, email, provider} = useSelector((state)=> state.user);
const colors = getThemeColors(theme);
const [imageUri, setImageUri] = useState(photoURL);
const {uploadImageToFirebase, deletePhoto} = useAuthentication();
const [modalVisible, setModalVisible] = useState(false);
const connection = useSelector(state=> state.internet.connection);


useEffect(() => {
  if (imageUri !== photoURL) {
    updateUserProfile(imageUri);
  }
}, [imageUri]);

const handleImageChange = async (uri) => {
  setImageUri(uri);
};

const openChangeNameModal = () => {
  if(connection)
    setModalVisible(true);
  else
  Alert.alert("No Internet Connection",
  "Please check your internet connection and try again.")
}


const closeChangeNameModal = () => {
  setModalVisible(false);
}

const updateUserProfile = async (uri) => {
  try {
      if(uri=="")
        {
          await deletePhoto();
        }
        else {
    const newPhotoURL = await uploadImageToFirebase(uri, uid);
    await auth().currentUser.updateProfile({ photoURL: newPhotoURL });
    dispatch(saveUser({ displayName, uid, email, photoURL: newPhotoURL, provider }));
        }
  } catch (error) {
    console.error("Error updating profile: ", error);
  }
};
  return (
    <ScrollView style={styles.container(colors)}>
      <ProfileImage onImageChange={handleImageChange} />
      <View style={{paddingTop:40}}>
      <View style={[styles.option(colors), styles.indent]} >
        {ICONS.ACCOUNT(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>{displayName} </Text>
        </View>
        <TouchableOpacity style={{ paddingLeft:20}}
        onPress={openChangeNameModal}
        >
        {ICONS.EDIT(24, 24)}
        </TouchableOpacity>
      </View>
      <View style={[styles.option(colors), styles.indent]}  >
        {ICONS.MAIL(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>{email} </Text>
        </View>
        {/* <TouchableOpacity style={{ paddingLeft:20}}>
        {ICONS.EDIT(24, 24)}
        </TouchableOpacity> */}
      </View>
      </View>
      <NameChange visible={modalVisible} onClose={closeChangeNameModal} />
    </ScrollView>
  );
};



export default AccountPage;
