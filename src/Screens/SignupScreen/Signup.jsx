import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert , ScrollView} from "react-native";
import { styles } from "./styles";
import { SIGNING } from "../../Constants/signingConstants";
import { Formik } from "formik";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your first name'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your surname'),
    email: Yup.string().email('Invalid email').required('Please enter your Email'),
    password: Yup.string()
    .min(8)
    .required('Please enter a password')
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    "Password should be atleast 8 characters long consisting of one or more uppercase, numbers and special characters"
),
    confirmPassword : Yup.string()
    .oneOf([Yup.ref('password')], "Your passwords do not match")
    .required("Confirm password is required")
  });


function Signup () {
    return (
    
        <Formik initialValues={{
            firstName:"",
            lastName:"",
            email:"",
            dob:"",
            phonenum:"",
            password:"",
            confirmPassword:"",   
        }}
        validationSchema={SignupSchema}
        onSubmit={values => Alert.alert("User Details", JSON.stringify(values))}
        > 

        {({values,errors,touched, handleChange, setFieldTouched, isValid, handleSubmit})=> (


      
        <View style={styles.wrapper}>
            <View style={styles.formContainer}>
            <Text style={styles.title}>
                Sign Up
            </Text>

            <View style={styles.inputWrapper} >

            <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.FIRSTNAME} 
            value={values.firstName}
            onChangeText={handleChange("firstName")}
            onBlur={()=>setFieldTouched("firstName")}  />

            { touched.firstName &&
                errors.firstName && (
                    <Text style={styles.errorTxt}>
                        {errors.firstName}
                    </Text>
                )
            }
            </View>


            <View style={styles.inputWrapper} >

            <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.LASTNAME} 
            value={values.lastName}
            onChangeText={handleChange("lastName")}
            onBlur={()=>setFieldTouched("lastName")}  />

            {touched.lastName &&
                errors.lastName && (
                    <Text style={styles.errorTxt}>
                        {errors.lastName}
                    </Text>
                )
            }
            </View>


            <View style={styles.inputWrapper} >

            <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.EMAIL} 
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={()=>setFieldTouched("email")}  />

            { touched.email &&
                errors.email && (
                    <Text style={styles.errorTxt}>
                        {errors.email}
                    </Text>
                )
            }
            </View>


            {/* <View style={styles.inputWrapper} >

            <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.DOB} 
            value={values.firstName}
            onChangeText={handleChange("firstName")}  />

            {
                errors.firstName && (
                    <Text style={styles.errorTxt}>
                        {errors.firstName}
                    </Text>
                )
            }
            </View> */}


            {/* <View style={styles.inputWrapper} >

            <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.PHONENUM} 
            value={values.firstName}
            onChangeText={handleChange("firstName")}  />

            {
                errors.firstName && (
                    <Text style={styles.errorTxt}>
                        {errors.firstName}
                    </Text>
                )
            }
            </View> */}

             <View style={styles.inputWrapper} >

            <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.SETPASSWORD} 
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={()=>setFieldTouched("password")}  />

            {touched.password &&
                errors.password && (
                    <Text style={styles.errorTxt}>
                        {errors.password}
                    </Text>
                )
            }
            </View>

             <View style={styles.inputWrapper} >

            <TextInput style={styles.inputStyle}
            placeholder= {SIGNING.CONFIRMPASSWORD} 
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}  />

            {
                errors.confirmPassword && (
                    <Text style={styles.errorTxt}>
                        {errors.confirmPassword}
                    </Text>
                )
            }
            </View>

            {/* <TouchableOpacity 
            onPress={handleSubmit}
            style={[styles.submitBtn, {backGroundColor: isValid? "#395B64" :"#A5C9CA" }]}
            disabled={!isValid}
            >
                <Text style={styles.submitBtnTxt}>
                    Submit
                </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
            style={[styles.submitBtn, {backgroundColor: isValid? "#3A1B6B" :"#BCA0DC" }]}
            onPress={handleSubmit}
            disabled={!isValid}
            >
                <Text style={styles.submitBtnTxt}>
                    Submit
                </Text>

            </TouchableOpacity>

            </View>
        </View>
         )} 

        </Formik>
    )
}

export default Signup;
