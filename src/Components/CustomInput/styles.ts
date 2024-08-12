import {StyleSheet} from 'react-native';
import {FONT} from '../../Constants/fontConstants';
import {ThemeColors, themeColors} from '../../Assets/Colors/themeColors';
import {dimensions} from '../../Constants/utility';

export const inputStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    customInput: {
      backgroundColor: colors.INPUTBG,
      width: dimensions.width * 0.9,
      height: 48,
      borderRadius: 8,
      paddingLeft: 16,
      paddingVertical: 8,
      fontFamily: FONT.BOLD,
      marginTop: 20,
      shadowColor: colors.INPUTSHADOW,
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.07,
      shadowRadius: 10,
      elevation: 7,
      color: colors.HEADERTITLE,
      paddingRight: 45,
    },
    parent: {
      position: 'relative',
    },
    button: {
      position: 'absolute',
      right: 0,
      padding: 8,
      top: '35%',
    },
  });
