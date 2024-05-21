import { StyleSheet } from "react-native";
import { FONT } from "../../Constants/fontConstants";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { dimensions } from "../../Constants/utility";

export const wlkStyles = StyleSheet.create({
    title : (colors)=>({
        fontFamily:FONT.EXTRA_BOLD,
        fontSize: 27,
        lineHeight: 32.74,
        color:colors.TITLECOLOR,
        marginTop:44,
    }),
    img:{
        width: dimensions.width*0.50,
        height: dimensions.width*0.50,
        marginTop:40

    },
    txt:(colors)=>({
        fontFamily:FONT.BOLD,
        fontSize: 24,
        lineHeight: 32.74,
        color:colors.TITLECOLOR,
        marginTop:120,
    }),
    button:{
        // marginTop:70,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 120,
        
    },
    loginButton: {
        paddingTop:10,
        alignItems:"center", 
        justifyContent:"center"
    },
    loginTxt:(colors)=>({
        textAlign:"center",
        fontFamily:FONT.REGULAR,
        fontSize:16,
        lineHeight:24,
        color: colors.TITLECOLOR,
    }),
    login : (colors)=>({
        textAlign:"center",
        fontFamily:FONT.REGULAR,
        fontSize:16,
        lineHeight:24,
        color: colors.BLUE,
        paddingTop:3,
        textAlignVertical:"center",
    }),
    touchable: {
        justifyContent:"center",
    }
})