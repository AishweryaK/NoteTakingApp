import {StyleSheet} from 'react-native';
import {FONT} from '../../Constants/fontConstants';
import {dimensions} from '../../Constants/utility';
import { ThemeColors } from '../../Assets/Colors/themeColors';

export const buttonStyles = (colors: ThemeColors) =>  
StyleSheet.create({
  googleButton: {
    backgroundColor: colors.BACKGROUND,
    marginTop: 10,
    borderColor: colors.BORDER,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 16,
  },
  googleTxt: {
    color: colors.TITLECOLOR,
    fontFamily: FONT.REGULAR_INTER,
  },
  customButton: {
    width: dimensions.width * 0.9,
    height: 48,
    borderRadius: 48,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONT.BOLD,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 17,
    color: colors.WHITE,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 41,
  },
});
