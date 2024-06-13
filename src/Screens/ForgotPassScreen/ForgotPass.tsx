import React from 'react';
import {View, KeyboardAvoidingView, Alert, Text, Platform} from 'react-native';
import {styles} from '../SignupScreen/styles';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomInput from '../../Components/CustomInput/CustomInput';
import auth from '@react-native-firebase/auth';
import {passStyles} from './passStyles';
import {SIGNING} from '../../Constants/signingConstants';
import {NAVIGATION} from '../../Constants/navConstants';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {SignupSchema} from '../SignupScreen/Signup';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ForgotPassScreenProps} from '../../Navigation/routeTypes';
import { FormValues } from '.';


const ForgotPassScreen: React.FC<ForgotPassScreenProps> = ({navigation}) => {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  const handleEmail = (values: FormValues) => {
    auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        Alert.alert('Email sent successfully!', 'Please set a new password');
        navigation.navigate(NAVIGATION.LOGIN);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert('Error sending email', 'Incorrect email');
        } else if (error.code === 'auth/too-many-requests') {
          Alert.alert(
            'Error sending email',
            'All requests from this device are blocked due to unusual activity. Please try again later',
          );
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert(
            'Error sending email',
            'No user corresponding this email exists. Please Sign up',
          );
        } else if (error.code === 'auth/network-request-failed') {
          Alert.alert(
            'No Internet Connection',
            'Please check your internet connection and try again.',
          );
        } else {
          Alert.alert('Error sending email', `${error.message}`);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={65}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper(colors)}>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: SignupSchema.fields.email,
        })}
        onSubmit={values => handleEmail(values)}>
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          isValid,
          handleSubmit,
        }) => (
          <>
            <CustomInput
              placeHolder={SIGNING.EMAIL}
              value={values.email}
              handleChange={() => handleChange('email')}
              handleBlur={() => setFieldTouched('email')}
            />

            {touched.email && errors.email && (
              <Text style={styles.errorTxt}>{errors.email}</Text>
            )}

            <View style={passStyles.bottom}>
              <CustomButton
                handleButton={handleSubmit}
                text={'Verify'}
                disable={!isValid}
              />
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassScreen;
