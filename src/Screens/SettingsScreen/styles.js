import { StyleSheet } from "react-native";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { FONT } from "../../Constants/fontConstants";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:APPCOLOR.BACKGROUND,
      paddingTop:30, 
      paddingHorizontal:16
    },
    heading: {
      fontSize: 24,
      marginBottom: 50,
      fontFamily:FONT.BOLD,
      color:APPCOLOR.HEADERTITLE, 
      alignItems:"center",
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    optionText: {
      marginLeft: 40,
      fontSize: 18,
    fontFamily:FONT.REGULAR
    },
  });