import React, { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { NAVIGATION } from '../../Constants/navConstants';
import auth from '@react-native-firebase/auth';
import { styles } from '../SignupScreen/styles';
import { SIGNING } from '../../Constants/signingConstants';
import { loginStyles } from './loginStyles';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { SignupSchema } from '../SignupScreen/Signup';
import useAuthentication from '../../Components/CustomHook';
import { APPCOLOR } from '../../Assets/Colors/appColors';


const LoginSchema = Yup.object().shape({
  email: SignupSchema.fields.email,
  password: SignupSchema.fields.password,
});

function Login({ navigation }) {
  const {isLoading, signInCall} = useAuthentication();

  const handleLogin = async (values) => {
    // try {
    //   const userCredential = await auth().signInWithEmailAndPassword(values.email, values.password);
    //   const user = userCredential.user;
    //   console.log('Logged in user:', user);

    //   if (user != null) {
    //     navigation.navigate(NAVIGATION.HOMESCREEN)
    //     // setEmail("");
    //     // setPass("");
    //   } else {
    //     Alert.alert("Wrong credentials", "Please Sign up")
    //   }
    // } catch (error) {
    //   Alert.alert('Login error:', error.message);
    // }

    await signInCall({email: values.email, password: values.password})
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={65}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.wrapper}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema} 
        onSubmit={values => handleLogin(values)}>
        {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
          <>
            {/* <View style={loginStyles.usrInfo}>
              {userInfo != null && (
                <>
                  <Text>{userInfo.user.name}</Text>
                  <Text>{userInfo.user.email}</Text>
                  <Image
                    source={{ uri: userInfo.user.photo }}
                    style={loginStyles.imgStyle}
                  />
                </>
              )}
            </View> */}

            <CustomInput
              placeHolder={SIGNING.EMAIL}
              value={values.email}
              handleChange={handleChange('email')}
              handleBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorTxt}>{errors.email}</Text>
            )}

            <CustomInput
              placeHolder={SIGNING.SETPASSWORD}
              value={values.password}
              handleChange={handleChange('password')}
              handleBlur={() => setFieldTouched('password')}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorTxt}>{errors.password}</Text>
            )}


            <View style={loginStyles.button}>
              <TouchableOpacity onPress={() => navigation.navigate(NAVIGATION.FORGOTPASS)}>
                <Text style={loginStyles.forgotTxt}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <View style={loginStyles.bottom}>
            {isLoading ? (
              <ActivityIndicator size="large" color={APPCOLOR.BLUE} />
            ) : (
              <CustomButton
                handleButton={handleSubmit}
                text={'Log in'}
                disable={!isValid}
              /> )}
            </View>

            
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default Login;

