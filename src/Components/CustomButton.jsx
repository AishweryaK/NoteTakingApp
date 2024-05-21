import React from "react";
import { TouchableOpacity, View, Text} from "react-native";
// import { } from "../Common/styles";
// import { APPCOLOR } from "../Assets/Colors/appColors";
// import { FONT } from "../Constants/fontConstants";
// import { dimensions } from "../Constants/utility";
import { buttonStyles } from "../Common/styles";
import { getThemeColors } from "../Assets/Colors/themeColors";
import { useSelector } from "react-redux";



export default function CustomButton ({handleButton, text, disable}) {
    // const theme = useSelector((state)=> state.user.theme)
    const colors = getThemeColors("LIGHT");
    return (
        <View>
            <TouchableOpacity
            style={buttonStyles.customButton(colors)}
            onPress={handleButton}
            disabled={disable}
            >
                <Text
                style={buttonStyles.buttonText(colors)}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}