import React from "react";
import { TouchableOpacity, View, Text} from "react-native";
import { buttonStyles } from "../Common/styles";
import { getThemeColors } from "../Assets/Colors/themeColors";



export default function CustomButton ({handleButton, text, disable}) {
    const colors = getThemeColors("LIGHT");
    return (
        <View>
            <TouchableOpacity
            style={[buttonStyles.customButton(colors, disable)]}
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