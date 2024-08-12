import {StyleSheet} from 'react-native';
import {ThemeColors, commonColors} from '../../Assets/Colors/themeColors';
import {FONT} from '../../Constants/fontConstants';

export const profileImgStyles = (colors:ThemeColors) => 
StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 300,
    marginBottom: 10,
  },
  text: {
    paddingTop: 5,
    fontSize: 14,
    color: commonColors.WHITE,
    textDecorationLine: 'underline',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: commonColors.BGCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.BACKGROUND,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 250,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: FONT.REGULAR,
    color: colors.HEADERTITLE,
    // paddingLeft:10
  },
  modalBox: {
    paddingHorizontal:30,
    backgroundColor: colors.BACKGROUND,
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection:'row',
  },
  button:
  {
  alignItems:'center', 
  justifyContent:'center',
  // paddingRight:15, 
},
buttonTwo:
  {
  // borderLeftColor:commonColors.GRAY, 
  // borderLeftWidth:1,
  alignItems:'center', 
  justifyContent:"center",
  paddingRight:10,
  paddingLeft:35
},
buttonThree:
  {
  alignItems:'center',  
  borderLeftColor:commonColors.GRAY, 
  borderLeftWidth:1,
  paddingLeft:10
}
});
