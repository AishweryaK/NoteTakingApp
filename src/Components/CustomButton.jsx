import React from "react";
import { TouchableOpacity, View, Text} from "react-native";
// import { } from "../Common/styles";
// import { APPCOLOR } from "../Assets/Colors/appColors";
// import { FONT } from "../Constants/fontConstants";
// import { dimensions } from "../Constants/utility";
import { buttonStyles } from "../Common/styles";



export default function CustomButton ({handleButton, text, disable}) {
    return (
        <View>
            <TouchableOpacity
            style={buttonStyles.customButton}
            onPress={handleButton}
            disabled={disable}
            >
                <Text
                style={buttonStyles.buttonText}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}