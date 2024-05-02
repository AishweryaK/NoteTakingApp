import React from "react";
import { View } from "react-native";
import { inputStyles } from "../Common/styles";
import { TextInput } from "react-native-gesture-handler";


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



{/* <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.EMAIL} 
            value={email}
            onChangeText={(text)=>setEmail(text)}  /> */}


            // <TextInput style={styles.inputStyle}
            // placeholder= {SIGNING.CONFIRMPASSWORD} 
            // value={values.confirmPassword}
            // onChangeText={handleChange("confirmPassword")}  />


            // <TextInput style={styles.inputStyle}
            // placeholder= {SIGNING.FIRSTNAME} 
            // value={values.firstName}
            // onChangeText={handleChange("firstName")}
            // onBlur={()=>setFieldTouched("firstName")}  />


            