import {StyleSheet} from 'react-native';
import {dimensions} from '../../Constants/utility';
import {FONT} from '../../Constants/fontConstants';
import {ThemeColors} from '../../Assets/Colors/themeColors';

export const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: dimensions.width * 0.44,
      width: dimensions.width * 0.43,
      marginLeft: 16,
      marginRight: 10,
    },
    bg: {
      width: '100%',
      height: '100%',
    },
    icon: {
      paddingLeft: 35,
      paddingTop: 35,
    },
    txtView: {
      paddingVertical: 15,
      paddingLeft: 35,
      paddingRight: 20,
      paddingBottom: 20,
    },
    title: {
      fontFamily: FONT.BOLD,
      lineHeight: 17,
      fontSize: 16,
      color: colors.TITLECOLOR,
    },
    txt: {
      fontFamily: FONT.REGULAR,
      fontSize: 16,
      color: colors.TITLECOLOR,
    },
  });
