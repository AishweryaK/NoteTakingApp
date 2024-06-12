import React from "react";
import { View, TextInput } from "react-native";
import { inputStyles } from "../Common/styles";
import { getThemeColors } from "../Assets/Colors/themeColors";
import { useReduxSelector } from "../Redux/Store/store";
// import { TextInput } from "react-native-paper";

interface CustomInputProps {
    placeHolder:string,
    value:string,
    handleChange : () => void,
    handleBlur : () => void,
}

export default function CustomInput ({placeHolder,value,handleChange,handleBlur}:CustomInputProps) {
    const theme = useReduxSelector((state)=> state.user.theme)
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


            