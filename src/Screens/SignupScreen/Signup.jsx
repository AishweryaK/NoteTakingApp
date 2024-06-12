import React , {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {SIGNING} from '../../Constants/signingConstants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import {NAVIGATION} from '../../Constants/navConstants';
import firestore from '@react-native-firebase/firestore';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { addDocumentsForUser } from '../../Common/firebaseUtils';
import ProfileImage from '../../Components/ProfileImage';
import { APPCOLOR } from '../../Assets/Colors/appColors';
import useAuthentication from '../../Components/CustomHook';
import { useReduxSelector } from 'react-redux';
import { getThemeColors } from '../../Assets/Colors/themeColors';
import OfflineSign from '../../Components/InternetConn';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .transform(value => value.trim())
    .min(3, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Please enter your First Name')
    .matches(/^[A-Za-z]+$/gi, "First Name should only contain alphabets") ,
  lastName: Yup.string()
    .transform(value => value.trim())
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Please enter your Last Name')
    .matches(/^[A-Za-z]+$/gi, "Last Name should only contain alphabets") ,
  email: Yup.string()
    .transform(value => value.trim())
    .email('Invalid email')
    .required('Please enter your Email')
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      'Invalid email',
    ),
  password: Yup.string()
  .transform(value => value.trim())
    .min(8)
    .max(25)
    .required('Please enter a Password')
    .matches(
      // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?!.*\s).{8,25}$/,
      'Password should consist of one or more uppercase, numbers and special characters, but no spaces',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Your passwords do not match')
    .required('Password Confirmation required'),
});

function Signup({navigation}) {
  const [imageUri, setImageUri]=  useState(""); 
  const {isLoading, signUpCall} = useAuthentication();
  const theme = useReduxSelector((state)=>state.user.theme)
  const colors= getThemeColors(theme);
  const connection = useReduxSelector(state=> state.internet.connection);

  const handleImageChange = (uri) => { 
    setImageUri(uri);
  };


  const handleSignUp = async values => {
    await signUpCall({email:values.email.trim(), 
      password: values.password.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      imageUri: imageUri});
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        phonenum: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => handleSignUp(values)}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          style={styles.wrapper(colors)}
          keyboardVerticalOffset={100}
          >  
           
          <ScrollView style={{marginBottom: 10}}>
          <View style={{ paddingHorizontal:8, paddingBottom:20}}>
            {/* <ProfileImage /> */}
            <ProfileImage onImageChange={handleImageChange} />  
            
            <CustomInput
              placeHolder={SIGNING.FIRSTNAME}
              value={values.firstName}
              handleChange={handleChange('firstName')}
              handleBlur={() => setFieldTouched('firstName')}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorTxt}>{errors.firstName}</Text>
            )}

            <CustomInput
              placeHolder={SIGNING.LASTNAME}
              value={values.lastName}
              handleChange={handleChange('lastName')}
              handleBlur={() => setFieldTouched('lastName')}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorTxt}>{errors.lastName}</Text>
            )}

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
            <View>
            {touched.password && errors.password && (
              <Text style={styles.errorTxt}>{errors.password}</Text>
            )}
            </View>

            <CustomInput
              placeHolder={SIGNING.CONFIRMPASSWORD}
              value={values.confirmPassword}
              handleChange={handleChange('confirmPassword')}
              handleBlur={() => setFieldTouched('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
            )}
                        </View>
          </ScrollView>
          <View style={styles.bottom}>
          {isLoading ? (
              <ActivityIndicator size="large" color={colors.BLUE} />
            ) : (
            <CustomButton
              handleButton={handleSubmit}
              disable={!isValid}
              text="Submit"
            />)}

          </View>

        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

export default Signup;
