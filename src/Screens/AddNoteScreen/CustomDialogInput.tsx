import React, {useState} from 'react';
import Dialog from 'react-native-dialog';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors, Theme} from '../../Assets/Colors/themeColors';
import {FONT} from '../../Constants/fontConstants';
import { CustomDialogInputProps } from '.';



const CustomDialogInput: React.FC<CustomDialogInputProps> = ({
  isVisible,
  onCancel,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme as Theme);

  return (
    <Dialog.Container visible={isVisible}>
      <Dialog.Title style={{fontFamily: FONT.BOLD}}>
        Enter Link URL
      </Dialog.Title>
      <Dialog.Input
        placeholder="Enter URL"
        placeholderTextColor={colors.PLACEHOLDER}
        onChangeText={setInputValue}
        value={inputValue}
      />
      <Dialog.Button label="Cancel" onPress={onCancel} color={colors.WHITE} />
      <Dialog.Button
        label="OK"
        onPress={() => onSubmit(inputValue)}
        color={colors.WHITE}
      />
    </Dialog.Container>
  );
};

export default CustomDialogInput;
