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
      marginBottom: 20,
      borderBottomColor:APPCOLOR.BORDER,
      borderBottomWidth:1,
      paddingBottom:15,
    },
    optionText: {
      marginLeft: 40,
      fontSize: 18,
    fontFamily:FONT.REGULAR,
    color:APPCOLOR.HEADERTITLE
    },
    view: { flex:1, 
      flexDirection:"row", 
      justifyContent:"space-between", 
      paddingRight:5
    }
  });