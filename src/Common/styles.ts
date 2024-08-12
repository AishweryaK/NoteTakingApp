import {StyleSheet} from 'react-native';
import {dimensions} from '../Constants/utility';
import {ThemeColors} from '../Assets/Colors/themeColors';

export const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND,
    },
  });

export const bottomTabStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    view: {
      flex: 1,
      backgroundColor: colors.BACKGROUND,
      height: dimensions.height * 0.073,
      paddingBottom: 5,
    },
    tabBarStyle: {
      backgroundColor: colors.BOTTOM,
      borderRadius: 20,
      justifyContent: 'center',
      marginHorizontal: 16,
      height: dimensions.height * 0.073,
    },
  });
