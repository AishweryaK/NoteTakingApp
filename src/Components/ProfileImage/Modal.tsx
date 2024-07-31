// ImageModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { launchCamera, launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { ICONS } from '../../Constants/iconConstants';
import { UPLOAD_IMAGE } from '../../Constants/strings';
import { profileImgStyles } from './styles';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { useReduxSelector } from '../../Redux/Store/store';
import { getThemeColors } from '../../Assets/Colors/themeColors';

interface ImageModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onImageChange: (uri: string) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ modalVisible, setModalVisible, onImageChange }) => {
    const {theme} = useReduxSelector(state => state.user);
    const colors = getThemeColors(theme);
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
      presentationStyle: 'currentContext',
      assetRepresentationMode: 'auto',
    };
    setTimeout(() => {
      launchCamera(options, handleResponse);
    }, 100);
    setModalVisible(false);
  };

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.error('User cancelled image picker');
    } else if (response.errorCode) {
      console.error('Image picker error: ', response.errorCode);
    } else {
      const selectedImageUri = response.assets && response.assets[0].uri;
      if (selectedImageUri) {
        onImageChange(selectedImageUri);
      }
    }
  };

//   const removeImage = async () => {
//     const reference = storage().ref('profile_images/userImg.jpeg');
//     const downloadURL = await reference.getDownloadURL();
//     setImageUri('');
//     onImageChange('');
//     const user = auth().currentUser;
//     setModalVisible(false);
//   };

  return (
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
            <TouchableOpacity
              onPress={handleCameraLaunch}
              style={profileImgStyles.buttonTwo}>
              {ICONS.CAMERA(25, 25)}
              <Text style={profileImgStyles.modalOption(colors)}>
                {UPLOAD_IMAGE.CAMERA}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={profileImgStyles.modalOption(colors)}>
              {UPLOAD_IMAGE.CANCEL}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;
