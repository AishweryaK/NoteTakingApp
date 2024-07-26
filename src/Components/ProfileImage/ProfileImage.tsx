import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {ICONS} from '../../Constants/iconConstants';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {profileImgStyles} from './styles';
import {useReduxSelector} from '../../Redux/Store/store';
import {commonColors, getThemeColors} from '../../Assets/Colors/themeColors';
import {PROVIDER} from '../../Constants/signingConstants';
import useAuthentication from '../CustomHook/authHook';
import {
  CONSTANTS,
  ERR_CONSOLE,
  ERR_MSG,
  ERR_TITLE,
  UPLOAD_IMAGE,
} from '../../Constants/strings';
import {showAlert} from '../../Common/alert';
import ImageSelector from './Image';
import {ProfileImageProps} from './profile_image';
import {IMAGES} from '../../Constants/strings';
import {userDocRef} from '../../Common/firebaseUtils';

const ProfileImage: React.FC<ProfileImageProps> = ({onImageChange}) => {
  const [imageUri, setImageUri] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {theme, uid, photoURL, provider} = useReduxSelector(
    state => state.user,
  );
  const {isLoading} = useAuthentication();
  const colors = getThemeColors(theme);
  const connection = useReduxSelector(state => state.internet.connection);

  const handleImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.2,
      maxHeight: 500,
      maxWidth: 500,
    };
    launchImageLibrary(options, handleResponse);
    setModalVisible(false);
  };

  const handleCameraLaunch = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.2,
      maxHeight: 500,
      maxWidth: 500,
      includeBase64: false,
      includeExtra: false,
      presentationStyle: 'currentContext' ,
      assetRepresentationMode: 'auto' ,
    };
    setTimeout(() => {
      launchCamera(options, handleResponse);
    }, 100);
    setModalVisible(false);
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.error(ERR_CONSOLE.DID_CANCEL);
    } else if (response.errorCode) {
      console.log(ERR_CONSOLE.IMAGE_PICKER_ERR, response.errorCode);
    } else {
      let selectedImageUri = response.assets && response.assets[0].uri;
      if (selectedImageUri) {
        setImageUri(selectedImageUri);
        onImageChange(selectedImageUri);
      }
    }
  };

  const removeImage = async () => {
    const reference = storage().ref('profile_images/userImg.jpeg');
    const downloadURL = await reference.getDownloadURL();
    // console.log(downloadURL,"DCFVE")
    setImageUri('');
    onImageChange('');
    const user = auth().currentUser;
    // const localImage = Image.resolveAssetSource(IMAGES.USER_IMG).uri;
    // await user?.updateProfile({
    //   photoURL: downloadURL,
    // });
    // await userDocRef(uid).set({
    //   photoURL:downloadURL,
    // },{merge: true});
    setModalVisible(false);
  };

  const handleIcon = () => {
    if (connection) {
      setModalVisible(true);
    } else {
      showAlert(ERR_TITLE.INTERNET, ERR_MSG.REQUEST_FAILED);
    }
  };

  return (
    <View style={profileImgStyles.container}>
      <ImageSelector imageUri={imageUri} photoURL={photoURL} />

      {isLoading ? (
        <ActivityIndicator size={'large'} color={colors.BLUE} />
      ) : provider === PROVIDER.EMAIL || provider === '' ? (
        <TouchableOpacity onPress={handleIcon}>
          {ICONS.CAMERA(24, 24)}
        </TouchableOpacity>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={profileImgStyles.modalBackground}>
          <View style={profileImgStyles.modalContainer(colors)}>
            <View style={profileImgStyles.modalBox(colors)}>
              <TouchableOpacity
                onPress={handleImagePicker}
                style={profileImgStyles.button}>
                {ICONS.GALLERY(25, 25)}
                <Text style={profileImgStyles.modalOption(colors)}>
                  {UPLOAD_IMAGE.GALLERY}
                </Text>
              </TouchableOpacity>
              {/* {Platform.OS === CONSTANTS.ANDROID && ( */}
                <TouchableOpacity
                  onPress={handleCameraLaunch}
                  style={profileImgStyles.buttonTwo}>
                  {ICONS.CAMERA(25, 25)}
                  <Text style={profileImgStyles.modalOption(colors)}>
                    {UPLOAD_IMAGE.CAMERA}
                  </Text>
                </TouchableOpacity>
              {/* )} */}
              {/* {imageUri || photoURL ? (
              <TouchableOpacity onPress={removeImage} style={profileImgStyles.buttonThree}>
                {ICONS.TRASH(25,25)}
                <Text style={profileImgStyles.modalOption(colors)}>
                  {UPLOAD_IMAGE.REMOVE}
                </Text>
              </TouchableOpacity>
            ) : null} */}
            </View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={profileImgStyles.modalOption(colors)}>
                {UPLOAD_IMAGE.CANCEL}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default React.memo(ProfileImage);
