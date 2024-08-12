import {StyleSheet} from 'react-native';
import {FONT} from '../../Constants/fontConstants';
import {ThemeColors} from '../../Assets/Colors/themeColors';

export const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND,
      paddingTop: 30,
      paddingHorizontal: 16,
    },
    heading: {
      fontSize: 24,
      marginBottom: 50,
      fontFamily: FONT.BOLD,
      color: colors.HEADERTITLE,
      alignItems: 'center',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      borderBottomColor: colors.BORDER,
      borderBottomWidth: 1,
      paddingBottom: 15,
    },
    optionText: {
      marginLeft: 40,
      fontSize: 18,
      fontFamily: FONT.REGULAR,
      color: colors.HEADERTITLE,
    },
    view: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: 5,
    },
    indent: {
      paddingTop: 30,
    },
    button: {
      paddingLeft: 20,
    },
  });
