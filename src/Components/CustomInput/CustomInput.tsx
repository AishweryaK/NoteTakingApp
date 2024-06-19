import React from 'react';
import {TextInput} from 'react-native';
import {inputStyles} from './styles';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {useReduxSelector} from '../../Redux/Store/store';
import {CustomInputProps} from './custom_input';

function CustomInput({
  placeHolder,
  value,
  handleChange,
  handleBlur,
}: CustomInputProps) {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  return (
    <TextInput
      style={inputStyles.customInput(colors)}
      placeholder={placeHolder}
      value={value}
      onChangeText={handleChange}
      onBlur={handleBlur}
      placeholderTextColor={colors.PLACEHOLDER}
    />
  );
}

export default React.memo(CustomInput);
