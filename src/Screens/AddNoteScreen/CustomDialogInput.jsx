import React, { useState } from 'react';
import Dialog from 'react-native-dialog';
import { useSelector } from 'react-redux';
import { getThemeColors } from '../../Assets/Colors/themeColors';
import { FONT } from '../../Constants/fontConstants';

const CustomDialogInput = ({ isVisible, onCancel, onSubmit}) => {
  const [inputValue, setInputValue] = useState('');
  const theme = useSelector(state=>state.user.theme);
  const colors = getThemeColors(theme);

  return (
    <Dialog.Container visible={isVisible}>
      <Dialog.Title style={{fontFamily:FONT.BOLD}}>Enter Link URL</Dialog.Title>
      <Dialog.Input
        placeholder="Enter URL"
        placeholderTextColor={colors.PLACEHOLDER}
        style={{}}
        onChangeText={setInputValue}
        value={inputValue}
      />
      <Dialog.Button label="Cancel" onPress={onCancel} 
      color={colors.WHITE}/>
      <Dialog.Button
        label="OK"
        onPress={() => onSubmit(inputValue)}
        color={colors.WHITE}
      />
    </Dialog.Container>
  );
};

export default CustomDialogInput;
