import {StyleSheet} from 'react-native';
import {FONT} from '../../Constants/fontConstants';
import {dimensions} from '../../Constants/utility';
import {commonColors} from '../../Assets/Colors/themeColors';

export const homeStyles = StyleSheet.create({
  buttonShadow: colors => ({
    shadowColor: colors.BLUE,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    bottom: dimensions.width * 0.07,
    textAlign: 'center',
    height: dimensions.width * 0.14,
    width: dimensions.width * 0.14,
    borderRadius: 11,
    backgroundColor: colors.BLUE,
    justifyContent: 'center',
    elevation: 7,
    alignItems: 'center',
  }),
  buttonText: colors => ({
    color: colors.WHITE,
    fontFamily: FONT.BOLD,
  }),
  welcome: colors => ({
    color: colors.WELCOME,
    fontFamily: FONT.REGULAR,
    fontSize: 14,
    lineHeight: 19.1,
  }),
  title: colors => ({
    fontFamily: FONT.EXTRA_BOLD,
    fontSize: 22,
    lineHeight: 30,
    color: colors.DARK_BLUE,
  }),
  userImg: colors => ({
    width: dimensions.width * 0.14,
    height: dimensions.width * 0.14,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.BORDER,
    backgroundColor: colors.BACKGROUND,
  }),
  img: {
    justifyContent: 'center',
    marginBottom: 20,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  safeArea: colors => ({
    flex: 1,
    paddingTop: 30,
    backgroundColor: colors.BACKGROUND,
  }),
  outer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
  },
  imgView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 40,
    width: dimensions.width * 0.92,
    height: dimensions.height * 0.25,
    marginBottom: 30,
  },
  textStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 20,
    width: '100%',
    paddingTop: '13%',
    paddingLeft: 30,
  },
  availsp: {
    height: 60,
    justifyContent: 'center',
    width: 200,
  },
  availText: {
    textAlign: 'left',
    fontFamily: FONT.EXTRA_BOLD,
    fontSize: 20,
    color: commonColors.WHITE,
  },
  availTextTwo: {
    textAlign: 'left',
    fontFamily: FONT.REGULAR,
    fontSize: 12,
    color: commonColors.WHITE,
  },
  view: {
    alignItems: 'center'
  },
});
