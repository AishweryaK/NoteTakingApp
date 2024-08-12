import {StyleSheet} from 'react-native';
import {FONT} from '../../Constants/fontConstants';
import {ThemeColors} from '../../Assets/Colors/themeColors';

export const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: colors.BACKGROUND,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colors.HEADERTITLE,
      fontFamily: FONT.REGULAR,
      fontSize: 18,
    },
  });
