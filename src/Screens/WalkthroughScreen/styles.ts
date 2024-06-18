import { StyleSheet } from "react-native";
import { FONT } from "../../Constants/fontConstants";
import { dimensions } from "../../Constants/utility";

export const styles = StyleSheet.create({
    wrapper: (colors) =>({ flex: 1,
        // alignItems: 'center',
        backgroundColor:colors.BACKGROUND,
        // paddingTop:30
        }),
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
        // marginTop:40,
        marginTop:dimensions.height*0.044

    },
    txt:(colors)=>({
        fontFamily:FONT.BOLD,
        fontSize: 24,
        lineHeight: 32.74,
        color:colors.TITLECOLOR,
        marginTop:dimensions.height*0.13,
        // marginTop:120
    }),
    button:{
        marginTop:dimensions.height*0.08,
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30,
        
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