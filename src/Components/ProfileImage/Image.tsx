import React from 'react';
import { Image, StyleProp, ImageStyle, ImageSourcePropType } from 'react-native';
import { profileImgStyles } from './styles';
import { ImageProps } from '.';
import { IMAGES } from '../../Constants/strings';

const ImageSelector= ({ imageUri, photoURL }:ImageProps) => {
  const source: ImageSourcePropType = imageUri
    ? { uri: imageUri }
    : photoURL
    ? { uri: photoURL }
    : IMAGES.USER_IMG;

  return <Image source={source} style={profileImgStyles.img as StyleProp<ImageStyle>} />;
};

export default ImageSelector;
