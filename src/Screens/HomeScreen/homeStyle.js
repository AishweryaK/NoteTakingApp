import { StyleSheet } from "react-native";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { FONT } from "../../Constants/fontConstants";
import { dimensions } from "../../Constants/utility";

export const homeStyles = StyleSheet.create({
    buttonShadow: {
        // shadowColor: '#171717',
        // shadowOffset: {width: -2, height: 4},
        // shadowOpacity: 0.4,
        // shadowRadius: 4,
        shadowColor: APPCOLOR.BLUE,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        position:"absolute", 
        right:dimensions.width*0.43, 
        bottom:80, 
        height:dimensions.width*0.14, 
        width:dimensions.width*0.14, 
        borderRadius:11, 
        backgroundColor:APPCOLOR.BLUE, 
        justifyContent:"center", 
        elevation:7,
        // alignItems:"center"
      },
      buttonText: {
        color:APPCOLOR.WHITE,
        fontFamily:FONT.BOLD,
       textAlign:"center", 
       fontSize:40},
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
        borderRadius:11,
        borderWidth:1,
        borderColor: APPCOLOR.BORDER,
        backgroundColor:APPCOLOR.BACKGROUND
       },
       img:{
        justifyContent:"center",
        // width:dimensions.width*0.92,
        marginBottom:20,
        height:"100%",
        width:"100%",
        alignItems:"center"
       },
       safeArea: {flex:1, 
        paddingTop:30, 
        backgroundColor:APPCOLOR.BACKGROUND,
      },
        outer : {paddingHorizontal:16, 
          flexDirection:"row", 
          justifyContent:"space-between"
        },
        inner: {
          flex:1, 
          flexDirection:"column"
      },
        imgView:
        {justifyContent:"center" ,
        alignItems:"center", 
        alignContent:"center", 
        paddingTop:40,
        width:dimensions.width*0.92, 
        height:dimensions.height*0.22, 
        position:"relative", 
        marginBottom:30,
      },
        

});