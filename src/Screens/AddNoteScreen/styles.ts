import {StyleSheet} from 'react-native';
import {FONT} from '../../Constants/fontConstants';
import {dimensions} from '../../Constants/utility';
import {ThemeColors, commonColors} from '../../Assets/Colors/themeColors';

export const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND,
    },
    view: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
    },
    collButton: {
      borderWidth: 2,
      borderRadius: 8,
      padding: 3,
      borderColor: colors.BORDER,
    },
    collText: {
      color: colors.HEADERTITLE,
      fontSize: 14,
      fontFamily: FONT.BOLD,
      maxWidth: dimensions.width * 0.4,
    },
    heading: {
      fontFamily: FONT.EXTRA_BOLD,
      fontSize: 18,
      color: colors.HEADERTITLE,
      textAlign: 'center',
    },
    title: {
      fontSize: 35,
      marginHorizontal: 20,
      fontFamily: FONT.REGULAR,
      color: colors.HEADERTITLE,
      opacity: 1,
    },
    editor: {
      backgroundColor: colors.BACKGROUND,
      color: colors.DARK_BLUE,
    },
    desc: {
      flex: 1,
      paddingHorizontal: 16,
      backgroundColor: colors.BACKGROUND,
      color: colors.HEADERTITLE,
    },
    buttonTxt: {
      color: colors.WHITE,
      fontFamily: FONT.BOLD,
      textAlign: 'center',
      fontSize: 20,
    },
    toolbar: {
      backgroundColor: colors.BLUE,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: commonColors.BGCOLOR70,
    },
    modalContent: {
      backgroundColor: commonColors.WHITE,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },
    collectionItem: {
      paddingVertical: 10,
      width: dimensions.width * 0.55,
    },
    collectionText: {
      fontFamily: FONT.REGULAR,
      fontSize: 16,
      color: colors.DARK_BLUE,
    },
    newCollectionInput: {
      borderWidth: 1,
      borderColor: colors.BORDER,
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      color: colors.TITLECOLOR,
      width: dimensions.width * 0.55,
    },
    addButton: {
      backgroundColor: colors.BLUE,
      padding: 10,
      borderRadius: 8,
      alignItems: 'center',
    },
    buttonText: {
      fontFamily: FONT.REGULAR,
      fontSize: 16,
      color: commonColors.WHITE,
    },
    addTxt: {
      fontFamily: FONT.BOLD,
      fontSize: 15,
      color: colors.WHITE,
    },
    closeButtonView: {
      flexDirection: 'row',
      width: dimensions.width * 0.65,
      justifyContent: 'space-between',
    },
    inner: {flex: 1},
    xButton: {
      borderColor: colors.BORDER,
      borderWidth: 2,
      borderRadius: 100,
      height: 25,
      width: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    err: {
      color: commonColors.ERROR,
      paddingBottom: 10,
      textAlign: 'left',
    },
    flex: {
      justifyContent: 'flex-end',
    },
    center: {
      alignItems: 'center',
      paddingBottom: 25,
      paddingTop: 10,
    },
    buttonShadow: {
      shadowColor: colors.BLUE,
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 10,
      // bottom: dimensions.width * 0.07,
      textAlign: 'center',
      height: dimensions.width * 0.14,
      width: dimensions.width * 0.14,
      borderRadius: 11,
      backgroundColor: colors.BLUE,
      justifyContent: 'center',
      elevation: 7,
      alignItems: 'center',
    },
    text: {
      color: colors.HEADERTITLE,
    },
    align: {
      alignItems: 'center',
    },
    imgParent: {
      position: 'relative',
      margin: 5,
    },
    imgBg: {
      minWidth: '100%',
      minHeight: dimensions.height / 4,
    },
    imgButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: commonColors.BGCOLOR50,
      padding: 5,
      borderRadius: 50,
      height: 30,
      width: 30,
      alignItems: 'center',
    },
    imgX: {
      color: 'white', 
    fontWeight: 'bold'
  },
  area: {
    maxHeight: dimensions.height * 0.5,
    width: dimensions.width * 0.8,
  },
  });
