import { StyleSheet } from "react-native";
import { APPCOLOR } from "../../Assets/Colors/appColors";
import { FONT } from "../../Constants/fontConstants";

export const styles = StyleSheet.create(
    {
        container: { flex: 1, 
            backgroundColor:APPCOLOR.BACKGROUND 
        },
        title : { fontSize: 35,
             marginHorizontal: 20, 
            // marginTop: 5, 
            color:APPCOLOR.HEADERTITLE,
            opacity:0.67,
        },
        editor: {backgroundColor:APPCOLOR.BACKGROUND, 
            color:APPCOLOR.DARK_BLUE,
        },
        desc: { flex:1, 
            paddingHorizontal:16, 
            backgroundColor:APPCOLOR.BACKGROUND,
            color: APPCOLOR.HEADERTITLE,
        },
        buttonTxt: {color:APPCOLOR.WHITE,
            fontFamily:FONT.BOLD,
           textAlign:"center", 
           fontSize:20},
           toolbar: {backgroundColor:APPCOLOR.BLUE}

    }
)