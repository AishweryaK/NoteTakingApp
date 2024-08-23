import {StyleSheet} from 'react-native';
import {FONT} from '../../Constants/fontConstants';
import {dimensions} from '../../Constants/utility';
import { ThemeColors, commonColors, themeColors } from '../../Assets/Colors/themeColors';

export const showStyles = (colors: ThemeColors) =>
StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    marginBottom: 10,
    marginHorizontal: 8,
    borderRadius: 20,
    padding: 20,
    fontFamily: FONT.REGULAR,

    shadowColor: colors.SHADOW,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 7,
    maxHeight: 100,
  },
  bottomButton: {
    borderRadius: 1000,
    width: dimensions.width * 0.5,
    justifyContent: 'flex-end',
  },
  txt: {
    fontFamily: FONT.EXTRA_BOLD,
    fontSize: 16,
    lineHeight: 22,
    color: colors.HEADERTITLE,
  },
  list: {
    paddingHorizontal: 4,
    paddingTop: 10,
  },
  content: {
    fontFamily: FONT.BOLD,
    fontSize: 14,
    lineHeight: 18.2,
    opacity: 0.67,
    color: colors.HEADERTITLE,
  },
  input: {
    alignItems: 'center',
    paddingBottom: 15,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: dimensions.width * 0.45,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColors.BGCOLOR50,
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: colors.BACKGROUND,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: FONT.BOLD,
    color: colors.TITLECOLOR,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: FONT.REGULAR,
    color: colors.TITLECOLOR,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalText: {
    fontFamily: FONT.BOLD,
    color: colors.HEADERTITLE,
    width: 100,
    textAlign: 'center',
    paddingVertical: 10,
    // backgroundColor:'transparent'
  },
  noNotes: {
    flex: 1,
    color: colors.HEADERTITLE,
    textAlign: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    fontFamily: FONT.BOLD,
    fontSize: 16,
    opacity: 0.5,
    paddingHorizontal: 16,
  },
  imgParent: {
    maxHeight: 150,
    overflow: 'scroll',
    width: '100%',
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  deleteButton: {
    backgroundColor: 'red', 
    borderRadius: 10, 
    color:themeColors.DARK.HEADERTITLE 
  },
  cancelButton:{
    backgroundColor: colors.CANCEL, 
    borderRadius: 10 
  },
  align:{
    alignItems:'center'
  },
  justify:{
    justifyContent:'center'
  }
});

export const getChildrenStyle = (colors: ThemeColors) => {
  return {
    backgroundColor: colors.BACKGROUND,
    marginBottom: 10,
    marginHorizontal: 8,
    borderRadius: 20,
    padding: 20,
    fontFamily: FONT.REGULAR,
    shadowColor: colors.SHADOW,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 7,
  };
};
