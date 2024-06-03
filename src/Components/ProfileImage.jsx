import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { ICONS } from "../Constants/iconConstants";
import { profileImgStyles } from "../Common/styles";
import { useSelector } from "react-redux";
import { getThemeColors } from "../Assets/Colors/themeColors";
import { PROVIDER } from "../Constants/signingConstants";
import useAuthentication from "./CustomHook";

function ProfileImage({onImageChange}) {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {theme, uid, photoURL, provider} = useSelector((state)=>state.user)
  const {isLoading} = useAuthentication();
  const colors= getThemeColors(theme);
  const connection = useSelector(state=> state.internet.connection);

  const handleImagePicker = () => {
    const options = {
      mediaType: "photo",
      quality : 0.2,
      maxHeight: 500,
      maxWidth: 500,
      // includeBase64: true
    };
    launchImageLibrary(options, handleResponse);
    setModalVisible(false);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: "photo",
      quality: 0.2,
      maxHeight: 500,
      maxWidth: 500,
      // includeBase64: true
    };
    launchCamera(options, handleResponse);
    setModalVisible(false);
  };

  const handleResponse = (response) => {
    if (response.didCancel) {
      console.log("User cancelled image picker");
    } else if (response.errorCode) {
      console.log("ImagePicker Error: ", response.errorCode);
    } else {
      let imageUri = response.uri || response.assets[0].uri;
      console.log(response,'asefaefrwwefewfaewf')
      setImageUri(imageUri);
      onImageChange(imageUri);
    }
  };

  const removeImage = () => {
    setImageUri("");
    onImageChange("");
    setModalVisible(false)
  }

  const handleIcon =() => {
    if(connection)
    setModalVisible(true);
  else
  Alert.alert("No Internet Connection",
  "Please check your internet connection and try again.")
  }

  return (
    <View style={profileImgStyles.container}>
     {imageUri ? (
  <Image source={{ uri: imageUri }} style={profileImgStyles.img} />
) : (
  photoURL ? (
    <Image source={{ uri: photoURL }} style={profileImgStyles.img} />
  ) : (
    <Image source={require("../Assets/Images/userImg.jpeg")} style={profileImgStyles.img} />
  )
)}

{
        isLoading? 
        (<ActivityIndicator size={"large"} color={colors.BLUE}/>)
        : (
          ( provider=== PROVIDER.EMAIL || provider=== "" ) && (
          <TouchableOpacity onPress={handleIcon}>
          {ICONS.CAMERA(24,24)}
        </TouchableOpacity>
          )
        )
       
      }
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={profileImgStyles.modalBackground}>
          <View style={profileImgStyles.modalContainer(colors)}>
            <TouchableOpacity onPress={handleImagePicker} >
              <Text style={profileImgStyles.modalOption(colors)}>Set Image From Gallery</Text>
            </TouchableOpacity>
            {/* {Platform.OS !== "ios" && ( */}
              <TouchableOpacity onPress={handleCameraLaunch}>
                <Text style={profileImgStyles.modalOption(colors)}>Upload From Camera</Text>
              </TouchableOpacity>
            {/* )} */}
            {
              imageUri || photoURL  ?
              (
              <TouchableOpacity onPress={removeImage}>
                <Text style={profileImgStyles.modalOption(colors)}>Remove Image</Text>
              </TouchableOpacity>
            ):null}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={profileImgStyles.modalOption(colors)}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


export default ProfileImage;
