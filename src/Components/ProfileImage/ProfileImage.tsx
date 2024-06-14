import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  ActivityIndicator,
  Alert,
  StyleProp,
  ImageStyle,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {ICONS} from '../../Constants/iconConstants';
import {profileImgStyles} from './styles';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {PROVIDER} from '../../Constants/signingConstants';
import useAuthentication from '../CustomHook/CustomHook';
import {
  ERR_CONSOLE,
  ERR_MSG,
  ERR_TITLE,
  UPLOAD_IMAGE,
} from '../../Constants/strings';
import {showAlert} from '../../Common/alert';
import ImageSelector from './Image';

interface ProfileImageProps {
  onImageChange: (imageUri: string) => void;
}

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
    };
    launchCamera(options, handleResponse);
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

  const removeImage = () => {
    setImageUri('');
    onImageChange('');
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
      {/* {imageUri ? (
        <Image
          source={{uri: imageUri}}
          style={profileImgStyles.img as StyleProp<ImageStyle>}
        />
      ) : photoURL ? (
        <Image
          source={{uri: photoURL}}
          style={profileImgStyles.img as StyleProp<ImageStyle>}
        />
      ) : (
        <Image
          source={require('../../Assets/Images/userImg.jpeg')}
          style={profileImgStyles.img as StyleProp<ImageStyle>}
        />
      )} */}
      <ImageSelector imageUri={imageUri} photoURL={photoURL}/>

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
            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={profileImgStyles.modalOption(colors)}>
                {UPLOAD_IMAGE.GALLERY}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCameraLaunch}>
              <Text style={profileImgStyles.modalOption(colors)}>
                {UPLOAD_IMAGE.CAMERA}
              </Text>
            </TouchableOpacity>
            {imageUri || photoURL ? (
              <TouchableOpacity onPress={removeImage}>
                <Text style={profileImgStyles.modalOption(colors)}>
                  {UPLOAD_IMAGE.GALLERY}
                </Text>
              </TouchableOpacity>
            ) : null}
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

export default ProfileImage;
