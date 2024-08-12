import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { inputStyles } from './styles';
import { commonColors, getThemeColors, themeColors } from '../../Assets/Colors/themeColors';
import { useReduxSelector } from '../../Redux/Store/store';
import { CustomInputProps } from './custom_input';
import { ICONS } from '../../Constants/iconConstants';

function CustomInput({
  placeHolder,
  value,
  handleChange,
  handleBlur,
  isPassword,
}: CustomInputProps) {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const [secure, setSecure] = useState<boolean>(true);

  const handleClick = () => {
    setSecure(!secure);
  }

  return (
    <View style={inputStyles(colors).parent}>
      <TextInput
        style={inputStyles(colors).customInput}
        placeholder={placeHolder}
        value={value}
        secureTextEntry={isPassword ? secure : false}
        onChangeText={handleChange}
        onBlur={handleBlur}
        placeholderTextColor={colors.PLACEHOLDER}
      />
      {isPassword && (
        <TouchableOpacity 
          style={inputStyles(colors).button} 
          onPress={handleClick}
        >
          {secure ? ICONS.EYEON(28, 28) : ICONS.EYEOFF(28, 28, themeColors.LIGHT.BLUE)}
        </TouchableOpacity>
      )}
    </View>
  );
}

export default React.memo(CustomInput);
