import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {buttonStyles} from './styles';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {CustomButtonProps} from "./custom_button";
import {THEME} from '../../Constants/strings';

function CustomButton({
  handleButton,
  text,
  disable,
}: CustomButtonProps) {
  const colors = getThemeColors(THEME.LIGHT);
  return (
    <View>
      <TouchableOpacity
        style={[buttonStyles(colors).customButton, {backgroundColor: disable ? colors.LIGHT_BLUE : colors.BLUE,}]}
        onPress={handleButton}
        disabled={disable}>
        <Text style={buttonStyles(colors).buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(CustomButton);
