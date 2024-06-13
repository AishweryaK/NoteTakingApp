import { StyleSheet } from "react-native/types";
import { dimensions } from "../../Constants/utility";
import { FONT } from "../../Constants/fontConstants";

export const styles= StyleSheet.create(
    {
        container:{
          flex:1,
          height:dimensions.width*0.44, 
          width:dimensions.width*0.43 ,
          marginLeft:16,
          marginRight:10,
        },
          bg:{
            width:"100%", 
          height:"100%"
        },
          icon:{ 
          paddingLeft:35,
          paddingTop:35
        },
          txtView:{
            paddingVertical:15,
            paddingLeft:35,
            paddingRight:20,
            paddingBottom:20
          },
          title : (colors)=> ({
            fontFamily:FONT.BOLD,
            lineHeight:17,
            fontSize:16,
            color:colors.TITLECOLOR,
          }),
          txt:(colors)=> ({
            fontFamily:FONT.REGULAR,
            fontSize:16,
            color:colors.TITLECOLOR,
          })
    }
  )
  