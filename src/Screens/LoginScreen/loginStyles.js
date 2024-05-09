import { StyleSheet } from "react-native";
import { FONT } from "../../Constants/fontConstants";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { dimensions } from "../../Constants/utility";

export const loginStyles = StyleSheet.create({
    usrInfo:{
        alignItems:"center",
        marginBottom:15
    },
    imgStyle: 
    {width: 100, 
    height: 100, 
    borderRadius: 50,
},
forgotTxt:{
    fontFamily:FONT.BOLD,
    fontSize:16,
    color:APPCOLOR.BLUE,
    textAlign:"left",
    marginTop:20,
    lineHeight:18,
},
button:{
    width:dimensions.width*0.9
},
bottom:{
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 60
}
});