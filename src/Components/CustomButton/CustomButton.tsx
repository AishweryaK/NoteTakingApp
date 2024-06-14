import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {buttonStyles} from './styles';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {CustomButtonProps} from '.';
import {THEME} from '../../Constants/strings';

export default function CustomButton({
  handleButton,
  text,
  disable,
}: CustomButtonProps) {
  const colors = getThemeColors(THEME.LIGHT);
  return (
    <View>
      <TouchableOpacity
        style={[buttonStyles.customButton(colors, disable)]}
        onPress={handleButton}
        disabled={disable}>
        <Text style={buttonStyles.buttonText(colors)}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
