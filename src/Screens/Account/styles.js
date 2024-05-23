import { StyleSheet } from "react-native";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { FONT } from "../../Constants/fontConstants";

export const styles = StyleSheet.create({
    container: (colors) => ({
      flex: 1,
      backgroundColor:colors.BACKGROUND,
      paddingTop:30, 
      paddingHorizontal:16,
    }),
    txt:(colors)=>({
      // textAlign:"center",
      color: colors.HEADERTITLE,
      paddingTop:20,
      paddingLeft:30
    })
  });