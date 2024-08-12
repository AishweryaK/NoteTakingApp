import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import auth from '@react-native-firebase/auth';
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
import {saveUser} from '../../Redux/Slices/userSlice';
import {AccountScreenProps} from '../../Navigation/routeTypes';

const AccountPage = ({navigation}: AccountScreenProps) => {
  const {displayName, theme, photoURL, uid, email, provider} = useReduxSelector(
    state => state.user,
  );
  const dispatch = useReduxDispatch();
  const colors = getThemeColors(theme);
  const {updateUserProfile} = useFirebaseUtils();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const connection = useReduxSelector(state => state.internet.connection);

  //  useFocusEffect(useCallback(() => {
  //   const user = auth().currentUser;
  //   user?.reload();
  //   auth().onUserChanged((user)=>{
  //     // console.log(user,"USER","FRRR")
  //     dispatch(
  //       saveUser({
  //         displayName: user?.displayName as string,
  //         photoURL: user?.photoURL as string,
  //         uid,
  //         provider,
  //         email,
  //         theme,
  //       })
  //     );
  //   });
  //   return
  // }, [ uid, provider]))

  useEffect(() => {
    const user = auth().currentUser;
    user?.reload();
    auth().onUserChanged(user => {
      // console.log(user,"USER","FRRR")
      if (user) {
        dispatch(
          saveUser({
            displayName: user?.displayName as string,
            photoURL: user?.photoURL as string,
            uid,
            provider,
            email,
            theme,
          }),
        );
      }
    });
    return;
  }, [uid, provider]);

  // useEffect(() => {
  //   if (imageUri !== photoURL) {
  //     updateUserProfile(imageUri);
  //   }
  // }, [imageUri, photoURL, updateUserProfile]);

  const handleImageChange = async (uri: string) => {
    // setImageUri(uri);
    updateUserProfile(uri);
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
    <ScrollView style={styles(colors).container}>
      <ProfileImage onImageChange={handleImageChange} />
      <View style={[styles(colors).option, styles(colors).indent]}>
        {ICONS.ACCOUNT(24, 24)}
        <View style={styles(colors).view}>
          <Text style={styles(colors).optionText}>{displayName}</Text>
        </View>
        <TouchableOpacity
          style={styles(colors).button}
          onPress={openChangeNameModal}>
          {provider === PROVIDER.EMAIL && ICONS.EDIT(24, 24)}
        </TouchableOpacity>
      </View>
      <View style={[styles(colors).option, styles(colors).indent]}>
        {ICONS.MAIL(24, 24)}
        <View style={styles(colors).view}>
          <Text style={styles(colors).optionText}>{email}</Text>
        </View>
      </View>
      <NameChange visible={modalVisible} onClose={closeChangeNameModal} />
    </ScrollView>
  );
};

export default AccountPage;
