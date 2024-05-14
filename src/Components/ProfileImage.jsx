// import React, { useState } from "react";
// import { StyleSheet, View, Image, TouchableOpacity, Text, Platform } from "react-native";
// import  {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// function ProfileImage() {
//   const [imageUri, setImageUri] = useState(null);

//   const handleImagePicker = () => {
//     const options = {
//         mediaType:'photo',
//       // title: 'Select Profile Image',
//       // storageOptions: {
//       //   skipBackup: true,
//       //   path: 'images',
//       //  },
//     };

//    launchImageLibrary(options,handleResponse);
//   };

//   const handleCameraLaunch = () => {
//     const options = {
//       mediaType:"photo",
//       maxHeight:100,
//       maxWidth: 100,
//     }

//     launchCamera(options, handleResponse);

//   };

//   const handleResponse= (response) => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.errorCode) {
//       console.log('ImagePicker Error: ', response.errorCode);
//     } else {
//       let imageUri = response.uri || response.assets[0].uri         //IMPORTANTTTTTTTTT
//       setImageUri(imageUri);    
//     }
//   };
  
  

//   return (
    
//     <View 
//     style={styles.container}
//     >
     
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.img} />
//         ) : (
//           <Image source={require('../Assets/Images/userImg.jpeg')} style={styles.img} />
//         )}
        
//          <TouchableOpacity onPress={handleImagePicker}>
//             <Text style={styles.text}>
//                 Set Image From Gallery
//             </Text>
//       </TouchableOpacity>
//       { Platform.OS!="ios" &&
//       <TouchableOpacity onPress={handleCameraLaunch}>
//             <Text style={styles.text}>
//                 Upload From Camera
//             </Text>
//       </TouchableOpacity>
// }
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     // paddingTop: 20,
//   },
//   img: {
//     height: 100,
//     width: 100,
//     borderRadius: 50,
//     marginBottom:8
//   },
//   text: {
//     paddingTop:5,
//     fontSize:14,
//     color :"white",
//     textDecorationLine: "underline",
    
//   }
// });

// export default ProfileImage;

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Platform,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { ICONS } from "../Constants/iconConstants";
import { APPCOLOR } from "../Assets/Colors/appColors";
import { FONT } from "../Constants/fontConstants";

function ProfileImage({onImageChange}) {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePicker = () => {
    const options = {
      mediaType: "photo",
    };
    launchImageLibrary(options, handleResponse);
    setModalVisible(false);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: "photo",
      maxHeight: 100,
      maxWidth: 100,
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
      setImageUri(imageUri);
    //   console.log(imageUri, "IMAGEEE")
      onImageChange(imageUri);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.img} />
      ) : (
        <Image
          source={require("../Assets/Images/userImg.jpeg")}
          style={styles.img}
        />
      )}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {ICONS.CAMERA(24,24)}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={handleImagePicker} >
              <Text style={styles.modalOption}>Set Image From Gallery</Text>
            </TouchableOpacity>
            {Platform.OS !== "ios" && (
              <TouchableOpacity onPress={handleCameraLaunch}>
                <Text style={styles.modalOption}>Upload From Camera</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalOption}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 3,
  },
  text: {
    paddingTop: 5,
    fontSize: 14,
    color: "white",
    textDecorationLine: "underline",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: APPCOLOR.BACKGROUND,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
    fontFamily:FONT.REGULAR
  },
});

export default ProfileImage;
