import React, {useState} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {ICONS} from '../../Constants/iconConstants';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {PROVIDER} from '../../Constants/signingConstants';
import useAuthentication from '../CustomHook/authHook';
import {ERR_TITLE, ERR_MSG} from '../../Constants/strings';
import {showAlert} from '../../Common/alert';
import ImageSelector from './Image';
import {ProfileImageProps} from './profile_image';
import ImageModal from './Modal';
import {profileImgStyles} from './styles';

const ProfileImage: React.FC<ProfileImageProps> = ({onImageChange}) => {
  const [imageUri, setImageUri] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {theme, photoURL, provider} = useReduxSelector(state => state.user);
  const {isLoading} = useAuthentication();
  const colors = getThemeColors(theme);
  const connection = useReduxSelector(state => state.internet.connection);

  const handleIcon = () => {
    if (connection) {
      setModalVisible(true);
    } else {
      showAlert(ERR_TITLE.INTERNET, ERR_MSG.REQUEST_FAILED);
    }
  };

  return (
    <View style={profileImgStyles(colors).container}>
      <ImageSelector imageUri={imageUri} photoURL={photoURL} />

      {isLoading ? (
        <ActivityIndicator size={'large'} color={colors.BLUE} />
      ) : provider === PROVIDER.EMAIL || provider === '' ? (
        <TouchableOpacity onPress={handleIcon}>
          {ICONS.CAMERA(24, 24)}
        </TouchableOpacity>
      ) : null}
      {/* <TouchableOpacity onPress={handleIcon}>
        {ICONS.CAMERA(24, 24)}
      </TouchableOpacity> */}

      <ImageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onImageChange={(uri: string) => {
          setImageUri(uri);
          onImageChange(uri);
        }}
      />
    </View>
  );
};

export default React.memo(ProfileImage);
