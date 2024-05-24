import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ICONS } from '../../Constants/iconConstants';
import { FONT } from '../../Constants/fontConstants';
import auth from '@react-native-firebase/auth';
import {styles} from '../SettingsScreen/styles';
import { NAVIGATION } from '../../Constants/navConstants';
import { useSelector } from 'react-redux';
import ProfileImage from '../../Components/ProfileImage';
import { getThemeColors } from '../../Assets/Colors/themeColors';
import useAuthentication from '../../Components/CustomHook';



const AccountPage = ({navigation}) => {
  
const {displayName, theme, photoURL, uid, email} = useSelector((state)=> state.user);
const colors = getThemeColors(theme);
const [imageUri, setImageUri] = useState(photoURL);
const {uploadImageToFirebase} = useAuthentication();

useEffect(()=>{
console.log("URI", imageUri)
},[imageUri])

const handleImageChange = async (uri) => {
  setImageUri(uri);
  await uploadImageToFirebase(uri, uid)
}
  return (
    <ScrollView style={styles.container(colors)}>
      <ProfileImage onImageChange={handleImageChange} />
      {/* <Text style={styles.txt(colors)}>
        {displayName}
      </Text> */}
      <View style={{paddingTop:40}}>
      <View style={[styles.option(colors), styles.indent]} 
      onPress={() => navigation.navigate(NAVIGATION.ACCOUNT)}>
        {ICONS.ACCOUNT(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>{displayName} </Text>
        </View>
      </View>
      <View style={[styles.option(colors), styles.indent]}  
      onPress={() => navigation.navigate(NAVIGATION.ACCOUNT)}>
        {ICONS.MAIL(24, 24)}
        <View style={styles.view}>
          <Text style={styles.optionText(colors)}>{email} </Text>
        </View>
      </View>
      </View>
      
    </ScrollView>
  );
};



export default AccountPage;
