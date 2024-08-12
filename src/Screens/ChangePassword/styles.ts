import {StyleSheet} from 'react-native';
import {ThemeColors, commonColors, themeColors} from '../../Assets/Colors/themeColors';
import {FONT} from '../../Constants/fontConstants';

export const styles = (colors:ThemeColors) => 
StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BACKGROUND,
    paddingTop: 30,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: colors.BACKGROUND,
  // },
  // heading: {
  //   fontSize: 24,
  //   color: colors.HEADERTITLE,
  //   padding: 16,
  // },
  // option:{
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   padding: 16,
  //   borderBottomWidth: 1,
  //   borderBottomColor: colors.BORDER,
  // },
  // view: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColors.BGCOLOR70,
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.BACKGROUND,
    padding: 20,
    borderRadius: 10,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: colors.HEADERTITLE,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.BORDER,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 40,
    color: colors.HEADERTITLE,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 30,
  },
  button: {
    padding: 10,
    backgroundColor: colors.BLUE,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: FONT.REGULAR,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 17,
    color: colors.WHITE,
  },
  errorTxt: {
    fontSize: 12,
    color: commonColors.ERROR,
    textAlign: 'left',
    paddingLeft: 10,
    paddingTop: 5,
    marginRight: 20,
  },
  // loadingContainer: buttonWidth => ({
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingLeft: buttonWidth / 2,
  // }),
  activity: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
    top: '35%',
  },
  position: {
    position: 'relative' 
  },
  align : {
    alignItems: 'flex-start'
  }
});
