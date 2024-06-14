import {StyleSheet} from 'react-native';
import {FONT} from '../../Constants/fontConstants';
import {dimensions} from '../../Constants/utility';
import {commonColors} from '../../Assets/Colors/themeColors';

export const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  }),
  view: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  collButton: colors => ({
    borderWidth: 2,
    borderRadius: 8,
    padding: 3,
    borderColor: colors.BORDER,
  }),
  collText: colors => ({
    color: colors.HEADERTITLE,
    fontSize: 14,
    fontFamily: FONT.BOLD,
  }),
  heading: colors => ({
    fontFamily: FONT.EXTRA_BOLD,
    fontSize: 18,
    color: colors.HEADERTITLE,
  }),
  title: colors => ({
    fontSize: 35,
    marginHorizontal: 20,
    fontFamily: FONT.REGULAR,
    color: colors.HEADERTITLE,
    opacity: 1,
  }),
  editor: colors => ({
    backgroundColor: colors.BACKGROUND,
    color: colors.DARK_BLUE,
  }),
  desc: colors => ({
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.BACKGROUND,
    color: colors.HEADERTITLE,
  }),
  buttonTxt: colors => ({
    color: colors.WHITE,
    fontFamily: FONT.BOLD,
    textAlign: 'center',
    fontSize: 20,
  }),
  toolbar: colors => ({
    backgroundColor: colors.BLUE,
  }),
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: commonColors.BGCOLOR,
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
    width: dimensions.width * 0.35,
  },
  collectionText: colors => ({
    fontFamily: FONT.REGULAR,
    fontSize: 16,
    color: colors.DARK_BLUE,
  }),
  newCollectionInput: colors => ({
    borderWidth: 1,
    borderColor: colors.BORDER,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: colors.TITLECOLOR,
    width: dimensions.width * 0.35,
  }),
  addButton: colors => ({
    backgroundColor: colors.BLUE,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  }),
  buttonText: {
    fontFamily: FONT.REGULAR,
    fontSize: 16,
    color: commonColors.WHITE,
  },
  addTxt: colors => ({
    fontFamily: FONT.BOLD,
    fontSize: 15,
    color: colors.WHITE,
  }),
  closeButtonView: {
    flexDirection: 'row',
    width: dimensions.width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {flex: 1, alignItems: 'center'},
  xButton: colors => ({
    borderColor: colors.BORDER,
    borderWidth: 2,
    borderRadius: 100,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  err: {
    color: commonColors.ERROR,
    paddingBottom: 10,
  },
  flex: {
    justifyContent: 'flex-end',
  },
});
