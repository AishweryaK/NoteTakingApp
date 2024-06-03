import { StyleSheet } from 'react-native';
import { themeColors } from '../../Assets/Colors/themeColors';
import { FONT } from '../../Constants/fontConstants';

export const styles = StyleSheet.create({
  wrapper: (colors) =>({ flex: 1,
    alignItems: 'center',
    backgroundColor:colors.BACKGROUND,
    paddingTop:30
    }),
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
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.BORDER,
    borderRadius: 20,
    paddingLeft:20,
    color:colors.HEADERTITLE,
  }),
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop:30
  },
  button:  (colors) => ({
    padding: 10,
    backgroundColor: colors.BLUE,
    borderRadius: 5,
  }),
  buttonText: (colors) => ( {
    fontFamily: FONT.REGULAR,
          fontSize:14,
          textAlign:"center",
          lineHeight:17,
          color: colors.WHITE,
  }),
  errorTxt: {
    fontSize: 12,
    color: '#FF0D10',
    // paddingBottom:10,
    textAlign:"center",
    paddingTop:5,
    marginRight:20,
},
});
