import React from "react";
import { View, TouchableOpacity, Text, ImageBackground } from "react-native";
import FrameIcon from "../Assets/Svgs/FrameIcon";
import { labelStyles } from "../Common/styles";
import { useSelector } from "react-redux";
import { getThemeColors } from "../Assets/Colors/themeColors";
import { ICONS } from "../Constants/iconConstants";


function CustomLabel ({handlePress, text, number}) {
    const theme = useSelector((state)=>state.user.theme)
    const colors = getThemeColors(theme);

    return (
        // <View style={{alignContent:"center", flex:1, backgroundColor:"red", justifyContent:"center"}}>
        <TouchableOpacity
        onPress={handlePress}
        style={labelStyles.container}
        >
        <ImageBackground source={theme==="LIGHT" ? require("../Assets/Images/LabelImg.png")
                : require("../Assets/Images/Label_dark.png")
            } 
        // resizeMode="stretch"
        style={labelStyles.bg} 
         > 
        
        <View style={labelStyles.icon}>
        {/* <FrameIcon /> */}
                   { theme==="LIGHT" ?   ICONS.NOTEBLUE(50,50)  :
                    ICONS.NOTEWHITE(50,50)}
                </View>
                <View style={labelStyles.txtView}>
                <Text numberOfLines={2} ellipsizeMode="tail"
                style={labelStyles.title(colors)}>
                    {text}
                </Text>
                <Text style={labelStyles.txt(colors)}>
                   {number} Files
                </Text>
                </View>
                </ImageBackground>
        </TouchableOpacity>
        //  </View>
    )
}

export default CustomLabel;



