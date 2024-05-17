import { StyleSheet } from "react-native";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { FONT } from "../../Constants/fontConstants";
import { dimensions } from "../../Constants/utility";

export const styles= StyleSheet.create(
    {
        wrapper: { 
            flex: 1, 
            backgroundColor: APPCOLOR.BACKGROUND,
        },
        container: {flex: 1,
            // alignItems: 'center',
            backgroundColor:APPCOLOR.BACKGROUND,
            // paddingTop:30, 
            // borderWidth:2,
            marginBottom:10,
            marginHorizontal:8,
            borderRadius:20,
            // paddingVertical:20,
            padding:20,
            fontFamily:FONT.REGULAR,
    
            shadowColor: APPCOLOR.BLUE,
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation:7,
        },
        txt:{
            fontFamily:FONT.EXTRA_BOLD,
            fontSize:16,
            lineHeight:22,
            color:APPCOLOR.HEADERTITLE
          },
          list: {paddingHorizontal:8,
        },
        content:{
            fontFamily:FONT.BOLD,
            fontSize:14,
            lineHeight:18.2,
            opacity: 0.67,
            color:APPCOLOR.HEADERTITLE
        },
        input :{ 
        alignItems:"center", 
        paddingBottom:15
    },
    button: {flex:1, flexDirection:"row", justifyContent:"space-evenly",  
    width:dimensions.width*0.45, paddingHorizontal:10
  }
    }
)