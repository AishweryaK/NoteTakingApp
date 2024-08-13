import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {profileImgStyles} from './styles';
import {ImageProps} from './profile_image';
import {IMAGES} from '../../Constants/strings';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';

const ImageSelector = ({imageUri, photoURL}: ImageProps) => {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const source: ImageSourcePropType = imageUri
    ? {uri: imageUri}
    : photoURL
    ? {uri: photoURL}
    : IMAGES.USER_IMG;

  return <Image source={source} style={profileImgStyles(colors).img} />;
};

export default React.memo(ImageSelector);
