import React, {useState} from 'react';
import Dialog from 'react-native-dialog';
import {useReduxSelector} from '../../Redux/Store/store';
import {
  getThemeColors,
  Theme,
  themeColors,
} from '../../Assets/Colors/themeColors';
import {FONT} from '../../Constants/fontConstants';
import {CustomDialogInputProps} from './add_note';
import {DIALOG} from '../../Constants/strings';

const CustomDialogInput: React.FC<CustomDialogInputProps> = ({
  isVisible,
  onCancel,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme as Theme);

  return (
    <Dialog.Container
      visible={isVisible}
      onRequestClose={() => onCancel()}
      onBackdropPress={onCancel}>
      <Dialog.Title style={{fontFamily: FONT.BOLD}}>
        {DIALOG.LINK_URL}
      </Dialog.Title>
      <Dialog.Input
        placeholder={DIALOG.ENTER_URL}
        placeholderTextColor={themeColors.DARK.PLACEHOLDER}
        onChangeText={setInputValue}
        value={inputValue}
      />
      <Dialog.Button label={DIALOG.CANCEL} onPress={onCancel} />
      <Dialog.Button label={DIALOG.OK} onPress={() => onSubmit(inputValue)} />
    </Dialog.Container>
  );
};

export default CustomDialogInput;
