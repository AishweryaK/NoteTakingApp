import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: (colors) => ({
      flex: 1,
      backgroundColor:colors.BACKGROUND,
      paddingTop:30, 
      paddingHorizontal:16,
    }),
    txt:(colors)=>({
      color: colors.HEADERTITLE,
      paddingTop:20,
      paddingLeft:30
    }),
    view:{ paddingTop: 40 },
    button:{ paddingLeft: 20 }
  });