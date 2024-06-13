import React, { useState } from "react";
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
} from "react-native";
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from "react-native-image-picker";
import { ICONS } from "../../Constants/iconConstants";
import { profileImgStyles } from "./styles";
import { useReduxSelector } from "../../Redux/Store/store";
import { getThemeColors } from "../../Assets/Colors/themeColors";
import { PROVIDER } from "../../Constants/signingConstants";
import useAuthentication from "../CustomHook/CustomHook";

interface ProfileImageProps {
  onImageChange: (imageUri: string) => void;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ onImageChange }) => {
  const [imageUri, setImageUri] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { theme, uid, photoURL, provider } = useReduxSelector(
    (state) => state.user
  );
  const { isLoading } = useAuthentication();
  const colors = getThemeColors(theme);
  const connection = useReduxSelector((state) => state.internet.connection);

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
      console.log("User cancelled image picker");
    } else if (response.errorCode) {
      console.log("ImagePicker Error: ", response.errorCode);
    } else {
      let selectedImageUri = (response.assets && response.assets[0].uri);
      if (selectedImageUri) {
        setImageUri(selectedImageUri);
        onImageChange(selectedImageUri);
      }
    }
  };

  const removeImage = () => {
    setImageUri("");
    onImageChange("");
    setModalVisible(false);
  };

  const handleIcon = () => {
    if (connection) {
      setModalVisible(true);
    } else {
      Alert.alert(
        "No Internet Connection",
        "Please check your internet connection and try again."
      );
    }
  };

  return (
    <View style={profileImgStyles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={profileImgStyles.img as StyleProp<ImageStyle>} />
      ) : photoURL ? (
        <Image source={{ uri: photoURL }} style={profileImgStyles.img as StyleProp<ImageStyle>} />
      ) : (
        <Image
          source={require("../Assets/Images/userImg.jpeg")}
          style={profileImgStyles.img as StyleProp<ImageStyle>}
        />
      )}

      {isLoading ? (
        <ActivityIndicator size={"large"} color={colors.BLUE} />
      ) : provider === PROVIDER.EMAIL || provider === "" ? (
        <TouchableOpacity onPress={handleIcon}>
          {ICONS.CAMERA(24, 24)}
        </TouchableOpacity>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={profileImgStyles.modalBackground}>
          <View style={profileImgStyles.modalContainer(colors)}>
            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={profileImgStyles.modalOption(colors)}>
                Set Image From Gallery
              </Text>
            </TouchableOpacity>
            {/* {Platform.OS !== "ios" && ( */}
            <TouchableOpacity onPress={handleCameraLaunch}>
              <Text style={profileImgStyles.modalOption(colors)}>
                Upload From Camera
              </Text>
            </TouchableOpacity>
            {/* )} */}
            {imageUri || photoURL ? (
              <TouchableOpacity onPress={removeImage}>
                <Text style={profileImgStyles.modalOption(colors)}>
                  Remove Image
                </Text>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={profileImgStyles.modalOption(colors)}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileImage;

