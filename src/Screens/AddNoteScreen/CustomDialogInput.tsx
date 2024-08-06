import React from 'react';
import Dialog from 'react-native-dialog';
import {themeColors} from '../../Assets/Colors/themeColors';
import {FONT} from '../../Constants/fontConstants';
import {CustomDialogInputProps} from './add_note';
import {DIALOG} from '../../Constants/strings';

const CustomDialogInput: React.FC<CustomDialogInputProps> = ({
  isVisible,
  onCancel,
  onSubmit,
  handleInput,
  input,
}) => {
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
        onChangeText={handleInput}
        value={input}
      />
      <Dialog.Button label={DIALOG.CANCEL} onPress={onCancel} />
      <Dialog.Button label={DIALOG.OK} onPress={onSubmit} />
    </Dialog.Container>
  );
};

export default CustomDialogInput;
