import React from "react";
import { View, TextInput } from "react-native";
import { inputStyles } from "../Common/styles";
import { getThemeColors } from "../Assets/Colors/themeColors";
import { useSelector } from "react-redux";
// import { TextInput } from "react-native-paper";


export default function CustomInput ({placeHolder,value,handleChange,handleBlur}) {
    const theme = useSelector((state)=> state.user.theme)
    const colors = getThemeColors(theme);
    return (
        <TextInput
        style={inputStyles.customInput(colors)}
        placeholder={placeHolder}
        value={value}
        onChangeText={handleChange}
        onBlur={handleBlur}
        placeholderTextColor={colors.PLACEHOLDER}

        />
    )
}


            