import { StyleSheet } from "react-native";
import { FONT } from "../../Constants/fontConstants";

export const styles = StyleSheet.create({
    container: (colors) => ({
      flex: 1,
      backgroundColor:colors.BACKGROUND,
      paddingTop:30, 
      paddingHorizontal:16
    }),
    heading: (colors)=> ({
      fontSize: 24,
      marginBottom: 50,
      fontFamily:FONT.BOLD,
      color:colors.HEADERTITLE, 
      alignItems:"center",
    }),
    option:(colors)=>({
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      borderBottomColor:colors.BORDER,
      borderBottomWidth:1,
      paddingBottom:15,
    }),
    optionText: (colors)=>({
      marginLeft: 40,
      fontSize: 18,
    fontFamily:FONT.REGULAR,
    color:colors.HEADERTITLE,
    }),
    view: { flex:1, 
      flexDirection:"row", 
      justifyContent:"space-between", 
      paddingRight:5
    },
    indent:{
      paddingTop:30
    }
  });