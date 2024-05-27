import { StyleSheet } from 'react-native';
import { themeColors } from '../../Assets/Colors/themeColors';

export const styles = StyleSheet.create({
  container: (colors) => ({
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  }),
  heading: (colors) => ({
    fontSize: 24,
    color: colors.HEADERTITLE,
    padding: 16,
  }),
  option: (colors) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.BORDER,
  }),
  view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: (colors) => ({
    fontSize: 18,
    color: colors.text,
    paddingLeft: 16,
  }),
  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: (colors) => ( {
    width: '80%',
    backgroundColor: colors.BACKGROUND,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  }),
  modalTitle:  (colors) => ({
    fontSize: 20,
    marginBottom: 20,
    color:colors.HEADERTITLE
  }),
  input:  (colors) => ({
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.BORDER,
    borderRadius: 20,
    paddingLeft:20
  }),
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button:  (colors) => ({
    padding: 10,
    backgroundColor: colors.BLUE,
    borderRadius: 5,
  }),
  buttonText: (colors) => ( {
    color: colors.BACKGROUND,
  }),
});
