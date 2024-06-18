import { StyleSheet } from "react-native";
import { dimensions } from "../Constants/utility";

export const styles = StyleSheet.create({
  container: colors => ({
    flex: 1,
    backgroundColor: colors.BACKGROUND,
  }),
});

export const bottomTabStyles= StyleSheet.create({
        view:(colors)=>({
        flex: 1,
        backgroundColor: colors.BACKGROUND,
        height: dimensions.height * 0.073,
        paddingBottom: 5,
      } )  
    }
)