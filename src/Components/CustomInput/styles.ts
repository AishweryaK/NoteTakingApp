import {StyleSheet} from 'react-native';
import {FONT} from '../../Constants/fontConstants';
import {themeColors} from '../../Assets/Colors/themeColors';
import {dimensions} from '../../Constants/utility';

export const inputStyles = StyleSheet.create({
  customInput: colors => ({
    backgroundColor: colors.WHITE,
    width: dimensions.width * 0.9,
    height: 48,
    borderRadius: 8,
    paddingLeft: 16,
    paddingVertical: 8,
    fontFamily: FONT.BOLD,
    marginTop: 20,
    shadowColor: colors.BLUE,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 7,
    color: themeColors.LIGHT.HEADERTITLE,
  }),
});
