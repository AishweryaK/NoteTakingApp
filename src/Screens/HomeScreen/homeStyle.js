import { StyleSheet } from "react-native";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { FONT } from "../../Constants/fontConstants";
import { dimensions } from "../../Constants/utility";

export const homeStyles = StyleSheet.create({
    buttonShadow: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 4,
        position:"absolute", right:40, bottom:40, height:60, width:60, 
              borderRadius:30, backgroundColor:"#3A1B6B", justifyContent:"center",
              elevation:15,
      },
      buttonText: {
        color:"white",
       textAlign:"center", 
       fontSize:25},
       welcome: {
        color:APPCOLOR.WELCOME,
        fontFamily:FONT.REGULAR,
        fontSize:14,
        lineHeight:19.1,
       },
       title:{
        fontFamily:FONT.EXTRA_BOLD,
        fontSize:22,
        lineHeight:30.01
       },
       userImg:{
        width:dimensions.width*0.14,
        height:dimensions.width*0.14,
        // width:50,
        // height:50,
        borderRadius:11,
        borderWidth:1,
        borderColor: APPCOLOR.BORDER,
       },
       img:{
        justifyContent:"center",
        width:dimensions.width*0.9,
        
       }

});