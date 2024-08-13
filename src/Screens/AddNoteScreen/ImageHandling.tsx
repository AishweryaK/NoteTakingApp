import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {ICONS} from '../../Constants/iconConstants';
import ImageModal from '../../Components/ProfileImage/Modal';
import {ProfileImageProps} from '../../Components/ProfileImage/profile_image';
import useAuthentication from '../../Components/CustomHook/authHook';
import {useReduxSelector} from '../../Redux/Store/store';
import {showAlert} from '../../Common/alert';
import {ERR_MSG, ERR_TITLE} from '../../Constants/strings';

function ImageHandling({onImageChange}: ProfileImageProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {uid} = useReduxSelector(state => state.user);
  const {uploadImageToFirebaseNote} = useAuthentication();
  const connection = useReduxSelector(state => state.internet.connection);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (connection) {
            setModalVisible(true);
          } else showAlert(ERR_TITLE.INTERNET, ERR_MSG.REQUEST_FAILED);
        }}>
        {ICONS.CAM(24, 24, 'white')}
      </TouchableOpacity>

      <ImageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onImageChange={async (uri: string) => {
          const downloadUri = await uploadImageToFirebaseNote({
            imageUri: uri,
            userId: uid,
          });
          onImageChange(downloadUri);
        }}
      />
    </>
  );
}

export default ImageHandling;
