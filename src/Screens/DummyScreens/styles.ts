import { StyleSheet } from "react-native";
import { FONT } from "../../Constants/fontConstants";

export const styles = StyleSheet.create(
    {
      view : (colors) => ({
        flex:1, 
        backgroundColor:colors.BACKGROUND,
        justifyContent:"center", 
        alignItems:"center",
      }),
      text : (colors) => ({
        color:colors.HEADERTITLE,
        fontFamily:FONT.REGULAR,
        fontSize:18
      }),
    }
  )
  