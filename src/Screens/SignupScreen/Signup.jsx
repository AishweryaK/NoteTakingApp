import React from "react";
import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { styles } from "./styles";
import { SIGNING } from "../../Constants/signingConstants";
import { Formik } from "formik";
import * as Yup from 'yup';
import { firebase } from "@react-native-firebase/auth";
import { NAVIGATION } from "../../Constants/navConstants";
import firestore from "@react-native-firebase/firestore";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { loginStyles } from "../LoginScreen/loginStyles";
import { APPCOLOR } from "../../Assets/Colors/appColors";

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
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Your passwords do not match")
        .required("Confirm password is required")
});


function Signup({ navigation }) {

    const handleSignUp = async (values) => {
        try {
            let userCredentials = await firebase.auth().createUserWithEmailAndPassword(
                values.email,
                values.password,
            );

            const user = userCredentials.user;
            await firestore().collection('users').doc(user.uid).collection('notes').add({
                title: "",
                desc: "",
            });

            console.log('User account created & signed in!', userCredentials.user);

            navigation.navigate(NAVIGATION.LOGIN);

        } catch (error) {
            console.error('Error creating account:', error.code, error.message);
        }
    };

    return (
        <Formik initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            dob: "",
            phonenum: "",
            password: "",
            confirmPassword: "",
        }}
            validationSchema={SignupSchema}
            onSubmit={values => handleSignUp(values)}
        >

            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.wrapper}
                    keyboardVerticalOffset={65}
                    >
                        <ScrollView
                        style={{marginBottom:10}} 
                        >
                    {/* <View style={styles.formContainer}> */}

                        {/* <Text style={styles.title}>
                            Sign Up
                        </Text> */}

                        <CustomInput
                            placeHolder={SIGNING.FIRSTNAME}
                            value={values.firstName}
                            handleChange={handleChange("firstName")}
                            handleBlur={() => setFieldTouched("firstName")}
                        />
                        {touched.firstName &&
                            errors.firstName && (
                                <Text style={styles.errorTxt}>
                                    {errors.firstName}
                                </Text>
                            )}

                        <CustomInput
                            placeHolder={SIGNING.LASTNAME}
                            value={values.lastName}
                            handleChange={handleChange("lastName")}
                            handleBlur={() => setFieldTouched("lastName")}
                        />
                        {touched.lastName &&
                            errors.lastName && (
                                <Text style={styles.errorTxt}>
                                    {errors.lastName}
                                </Text>
                            )}

                        <CustomInput
                            placeHolder={SIGNING.EMAIL}
                            value={values.email}
                            handleChange={handleChange("email")}
                            handleBlur={() => setFieldTouched("email")}
                        />
                        {touched.email &&
                            errors.email && (
                                <Text style={styles.errorTxt}>
                                    {errors.email}
                                </Text>
                            )}

                        <CustomInput
                            placeHolder={SIGNING.SETPASSWORD}
                            value={values.password}
                            handleChange={handleChange("password")}
                            handleBlur={() => setFieldTouched("password")}
                        />
                        {touched.password &&
                            errors.password && (
                                <Text style={styles.errorTxt}>
                                    {errors.password}
                                </Text>
                            )}

                        <CustomInput
                            placeHolder={SIGNING.CONFIRMPASSWORD}
                            value={values.confirmPassword}
                            handleChange={handleChange("confirmPassword")}
                            handleBlur={() => setFieldTouched("confirmPassword")}
                        />
                        {touched.confirmPassword &&
                            errors.confirmPassword && (
                                <Text style={styles.errorTxt}>
                                    {errors.confirmPassword}
                                </Text>
                            )}

                        {/* <TouchableOpacity
                            style={[styles.submitBtn, { backgroundColor: isValid ? "#3A1B6B" : "#BCA0DC" }]}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.submitBtnTxt}>
                                Submit
                            </Text>

                        </TouchableOpacity> */}
                         </ScrollView>
                        <View style={styles.bottom}>
                        <CustomButton 
                        // style={{backgroundColor: isValid ? APPCOLOR.BLUE : APPCOLOR.LIGHT_BLUE}}
                        handleButton={handleSubmit}
                        disable={!isValid}
                        text="Submit"
                        />
                        </View>

                    {/* </View> */}
                   
                </KeyboardAvoidingView>
            )}

        </Formik>
    )
}

export default Signup;

