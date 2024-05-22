import { StyleSheet } from "react-native";
// import { colors } from "../Assets/Colors/appColors";
import { FONT } from "../Constants/fontConstants";
import { dimensions } from "../Constants/utility";
import { themeColors } from "../Assets/Colors/themeColors";

export const buttonStyles= StyleSheet.create(
    {
      googleButton: (colors)=>({
        backgroundColor: colors.BACKGROUND, 
        marginTop:10, 
        borderColor:colors.BORDER, 
        borderWidth:1,
        display:"flex", 
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"flex-start", 
        paddingLeft:16 
      }),
      
      googleTxt: (colors)=>({
        color:colors.TITLECOLOR,
        fontFamily: FONT.REGULAR_INTER,
        paddingLeft:65,
        // textAlign:"center",
      }),
      customButton : (colors) =>  ({ 
        backgroundColor: colors.BLUE,
        width: dimensions.width*0.9,
        height: 48,
        borderRadius:48,
        justifyContent:"center",
      }),
      buttonText: (colors) =>
        ({
          fontFamily: FONT.BOLD,
          // fontWeight:900,
          fontSize:16,
          textAlign:"center",
          lineHeight:17,
          color: colors.WHITE,
          paddingTop:1,
        }),
       
    }
)


export const inputStyles= StyleSheet.create(
  {
      customInput:(colors) => ( { 
        backgroundColor: colors.WHITE,
        width:dimensions.width*0.9,
        height:48,
        borderRadius:8,
        paddingLeft:16,
        paddingVertical:8,
        fontFamily:FONT.BOLD,
        marginTop:20,
        // marginBottom:10,

        shadowColor: colors.BLUE,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation:7,
        color:themeColors.LIGHT.HEADERTITLE,

    }),  
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
        height:"100%"
      },
        icon:{ 
        // position: 'relative', 
        // top: 35, 
        // left: 35,
        paddingLeft:35,
        paddingTop:35
      },
        txtView:{
          // position:"absolute", 
          // top:105, 
          // left:35,
          // flexDirection:"column",
          // paddingRight:5
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
          // lineHeight:12.8,
          fontSize:16,
          color:colors.TITLECOLOR,
        })
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
    modalContainer: (colors)=>({
      backgroundColor: colors.BACKGROUND,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    }),
    modalOption: (colors)=>({
      fontSize: 16,
      paddingVertical: 10,
      fontFamily:FONT.REGULAR,
      color:colors.HEADERTITLE
    }),
  }
)