import React from "react";
import { View, TouchableOpacity, Text, ImageBackground } from "react-native";
import { labelStyles } from "../Common/styles";
import { useSelector } from "react-redux";
import { getThemeColors } from "../Assets/Colors/themeColors";
import { ICONS } from "../Constants/iconConstants";


function CustomLabel ({handlePress, text, number}) {
    const theme = useSelector((state)=>state.user.theme)
    const colors = getThemeColors(theme);

    return (
        <TouchableOpacity
        onPress={handlePress}
        style={labelStyles.container}
        >
        <ImageBackground source={theme==="LIGHT" ? require("../Assets/Images/LabelImg.png")
                : require("../Assets/Images/Label_dark.png")
            } 
        style={labelStyles.bg} 
         > 
        
        <View style={labelStyles.icon}>
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
    )
}

export default CustomLabel;



