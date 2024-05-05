import React from "react";
import { View, TextInput } from "react-native";
import { inputStyles } from "../Common/styles";
// import { TextInput } from "react-native-gesture-handler";


export default function CustomInput ({placeHolder,value,handleChange,handleBlur}) {
    return (
        <TextInput
        style={inputStyles.customInput}
        placeholder={placeHolder}
        value={value}
        onChangeText={handleChange}
        onBlur={handleBlur}

        />
    )
}


            