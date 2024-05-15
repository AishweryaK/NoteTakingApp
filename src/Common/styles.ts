import { StyleSheet } from "react-native";
import { APPCOLOR } from "../Assets/Colors/appColors";
import { FONT } from "../Constants/fontConstants";
import { dimensions } from "../Constants/utility";

export const buttonStyles= StyleSheet.create(
    {
      googleButton: {
        backgroundColor: APPCOLOR.WHITE, 
        marginTop:10, 
        borderColor:APPCOLOR.BORDER, 
        borderWidth:1,
        display:"flex", 
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"flex-start", 
        paddingLeft:16 
      },
      
      googleTxt: {
        color:APPCOLOR.TITLECOLOR,
        fontFamily: FONT.REGULAR_INTER,
        paddingLeft:67,
      },
      customButton: { 
        backgroundColor: APPCOLOR.BLUE,
        width: dimensions.width*0.9,
        height: 48,
        borderRadius:48,
        justifyContent:"center",
      },
      buttonText:
        {
          fontFamily: FONT.BOLD,
          // fontWeight:900,
          fontSize:16,
          textAlign:"center",
          lineHeight:16,
          color: APPCOLOR.WHITE,
          paddingTop:1,
        },
       
    }
)


export const inputStyles= StyleSheet.create(
  {
      customInput: { 
        backgroundColor: APPCOLOR.WHITE,
        width:dimensions.width*0.9,
        height:48,
        borderRadius:8,
        paddingLeft:16,
        paddingVertical:8,
        fontFamily:FONT.BOLD,
        marginTop:20,

        shadowColor: APPCOLOR.BLUE,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation:7,
        color:APPCOLOR.HEADERTITLE,

    },  
  }
)

export const labelStyles= StyleSheet.create(
  {
      container:{
        height:dimensions.width*0.44, 
        width:dimensions.width*0.43 ,
        marginLeft:16,
        marginRight:10
      },
        bg:{
          width:"100%", 
        height:"100%"},
        icon:{ 
        position: 'absolute', 
        top: 35, 
        left: 35
      },
        txtView:{
          position:"absolute", 
          top:105, 
          left:35,
          flexDirection:"column"
        },
        title: {
          fontFamily:FONT.BOLD,
          // lineHeight:12.8,
          fontSize:16,
          color:APPCOLOR.TITLECOLOR,
        },
        txt:{
          fontFamily:FONT.REGULAR,
          // lineHeight:12.8,
          fontSize:16,
          color:APPCOLOR.TITLECOLOR,
        }
  }
)

export const profileImgStyles= StyleSheet.create(
  {
    container: {
      alignItems: "center",
    },
    img: {
      height: 100,
      width: 100,
      borderRadius: 50,
      marginBottom: 3,
    },
    text: {
      paddingTop: 5,
      fontSize: 14,
      color: "white",
      textDecorationLine: "underline",
    },
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: APPCOLOR.BACKGROUND,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalOption: {
      fontSize: 16,
      paddingVertical: 10,
      fontFamily:FONT.REGULAR
    },
  }
)