// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import {ICONS} from '../../Constants/iconConstants';
// import {styles} from '../SettingsScreen/styles';
// import {useReduxDispatch, useReduxSelector} from '../../Redux/Store/store';
// import ProfileImage from '../../Components/ProfileImage/ProfileImage';
// import {getThemeColors} from '../../Assets/Colors/themeColors';
// import NameChange from './NameChange';
// import {showAlert} from '../../Common/alert';
// import {ERR_MSG, ERR_TITLE} from '../../Constants/strings';
// import {PROVIDER} from '../../Constants/signingConstants';
// import useFirebaseUtils from '../../Components/CustomHook/profileHooks';
// import { saveUser } from '../../Redux/Slices/userSlice';
// import { useNavigation } from '@react-navigation/native';
// import { NAVIGATION } from '../../Constants/navConstants';
// import { AccountScreenProps } from '../../Navigation/routeTypes';

// const AccountPage = ({navigation}:AccountScreenProps) => {
//   const {displayName, theme, photoURL, uid, email, provider} = useReduxSelector(
//     state => state.user,
//   );
//   const colors = getThemeColors(theme);
//   const [imageUri, setImageUri] = useState<string | null>(photoURL);
//   const {updateUserProfile} = useFirebaseUtils();
//   const [modalVisible, setModalVisible] = useState<boolean>(false);
//   const connection = useReduxSelector(state => state.internet.connection);

//   useEffect(() => {
//     if (imageUri !== photoURL) {
//       updateUserProfile(imageUri);
//     }
//   }, [imageUri]);


//   const handleImageChange = async (uri: string) => {
//     setImageUri(uri);
//   };

//   const openChangeNameModal = () => {
//     if (connection) {
//       setModalVisible(true);
//     } else {
//       showAlert(ERR_TITLE.INTERNET, ERR_MSG.REQUEST_FAILED);
//     }
//   };

//   const closeChangeNameModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <ScrollView style={styles.container(colors)}>
//       <ProfileImage onImageChange={handleImageChange} />
//       <View style={[styles.option(colors), styles.indent]}>
//         {ICONS.ACCOUNT(24, 24)}
//         <View style={styles.view}>
//           <Text style={styles.optionText(colors)}>{displayName}</Text>
//         </View>
//         <TouchableOpacity style={styles.button} onPress={openChangeNameModal}>
//           {provider === PROVIDER.EMAIL && ICONS.EDIT(24, 24)}
//         </TouchableOpacity>
//       </View>
//       <View style={[styles.option(colors), styles.indent]}>
//         {ICONS.MAIL(24, 24)}
//         <View style={styles.view}>
//           <Text style={styles.optionText(colors)}>{email}</Text>
//         </View>
//       </View>
//       <NameChange visible={modalVisible} onClose={closeChangeNameModal} />
//     </ScrollView>
//   );
// };

// export default AccountPage;



import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ICONS} from '../../Constants/iconConstants';
import {styles} from '../SettingsScreen/styles';
import {useReduxDispatch, useReduxSelector} from '../../Redux/Store/store';
import ProfileImage from '../../Components/ProfileImage/ProfileImage';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import NameChange from './NameChange';
import {showAlert} from '../../Common/alert';
import {ERR_MSG, ERR_TITLE} from '../../Constants/strings';
import {PROVIDER} from '../../Constants/signingConstants';
import useFirebaseUtils from '../../Components/CustomHook/profileHooks';
import { saveUser } from '../../Redux/Slices/userSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '../../Constants/navConstants';
import { AccountScreenProps } from '../../Navigation/routeTypes';
import { userDocRef } from '../../Common/firebaseUtils';

const AccountPage = ({navigation}: AccountScreenProps) => {
  const {displayName, theme, photoURL, uid, email, provider} = useReduxSelector(
    state => state.user,
  );
  const dispatch = useReduxDispatch();
  const colors = getThemeColors(theme);
  const [imageUri, setImageUri] = useState<string | null>(photoURL);
  const {updateUserProfile} = useFirebaseUtils();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const connection = useReduxSelector(state => state.internet.connection);


   useFocusEffect(useCallback(() => {
    const user = auth().currentUser;
    user?.reload();
    auth().onUserChanged((user)=>{
      // console.log(user,"USER","FRRR")
      dispatch(
        saveUser({
          displayName: user?.displayName as string,
          photoURL: user?.photoURL as string,
          uid,
          provider,
          email,
          theme,
        })
      );
    });
    return
  }, [dispatch, uid, provider]))


  useEffect(() => {
    if (imageUri !== photoURL) {
      updateUserProfile(imageUri);
    }
  }, [imageUri, photoURL, updateUserProfile]);

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



