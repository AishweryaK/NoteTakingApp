import React, { useEffect, useState } from 'react';
import {TouchableOpacity} from 'react-native';
import {ICONS} from '../../Constants/iconConstants';
import ImageModal from '../../Components/ProfileImage/Modal';
import { ProfileImageProps } from '../../Components/ProfileImage/profile_image';
import useAuthentication from '../../Components/CustomHook/authHook';
import { useReduxSelector } from '../../Redux/Store/store';

function ImageHandling({onImageChange}:ProfileImageProps) {
    const [modalVisible,setModalVisible] = useState<boolean>(false);
    const {uid} = useReduxSelector(state=>state.user)
    const {uploadImageToFirebaseNote} = useAuthentication();

  return (
    <>
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}>
      {ICONS.CAM(24, 24, 'white')}
    </TouchableOpacity>

    <ImageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onImageChange={async(uri: string) => {
            const downloadUri = await uploadImageToFirebaseNote({imageUri:uri,userId:uid});
            onImageChange(downloadUri);
        }}
      />
    </>
  );
}

export default ImageHandling;
