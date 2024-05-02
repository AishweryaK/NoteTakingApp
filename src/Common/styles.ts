import { StyleSheet } from "react-native";
import { APPCOLOR } from "../Assets/Colors/appColors";
import { FONT } from "../Constants/fontConstants";
import { dimensions } from "../Constants/utility";

export const buttonStyles= StyleSheet.create(
    {
        customButton: { backgroundColor: APPCOLOR.BLUE,
          width: dimensions.width*0.9,
          height: 48,
          borderRadius:48,
          justifyContent:"center",
      },
        buttonText:
          {
            fontFamily: FONT.REGULAR,
            // fontWeight:1,
            fontSize:16,
            textAlign:"center",
            lineHeight:16,
            color: APPCOLOR.WHITE,
        }

        
    }
)


export const inputStyles= StyleSheet.create(
  {
      customInput: { 
        // backgroundColor: APPCOLOR.BLUE,
        // width: dimensions.width*0.9,
        // height: 48,
        // borderRadius:48,
        // justifyContent:"center",

        backgroundColor: APPCOLOR.WHITE,
        width:dimensions.width*0.9,
        height:48,
        borderRadius:8,
        

    },  
  }
)