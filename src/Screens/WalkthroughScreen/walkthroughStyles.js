import { StyleSheet } from "react-native";
import { FONT } from "../../Constants/fontConstants";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { dimensions } from "../../Constants/utility";

export const wlkStyles = StyleSheet.create({
    title : {
        fontFamily:FONT.EXTRA_BOLD,
        fontSize: 27,
        lineHeight: 32.74,
        color:APPCOLOR.TITLECOLOR,
        marginTop:44,
    },
    img:{
        width: dimensions.width*0.50,
        height: dimensions.width*0.50,
        marginTop:40

    },
    txt:{
        fontFamily:FONT.BOLD,
        fontSize: 24,
        lineHeight: 32.74,
        color:APPCOLOR.TITLECOLOR,
        marginTop:120,
    },
    button:{
        // marginTop:70,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 120,
        
    },
    loginButton: {
        paddingTop:10,
    },
    loginTxt:{
        textAlign:"center",
        fontFamily:FONT.REGULAR,
        fontSize:16,
        lineHeight:24
    },
    login : {
        textAlign:"center",
        fontFamily:FONT.REGULAR,
        fontSize:16,
        lineHeight:24,
        color: APPCOLOR.BLUE,
        paddingTop:2
    },
})