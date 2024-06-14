import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {NAVIGATION} from '../../Constants/navConstants';
import {styles} from '../SignupScreen/styles';
import {SIGNING} from '../../Constants/signingConstants';
import {loginStyles} from './loginStyles';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CustomInput from '../../Components/CustomInput/CustomInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {SignupSchema} from '../SignupScreen/Signup';
import useAuthentication from '../../Components/CustomHook/CustomHook';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors, themeColors} from '../../Assets/Colors/themeColors';
import {LoginScreenProps} from '../../Navigation/routeTypes';
import { FormValues } from '.';
import { CONSTANTS, FORGOT_PASSOWRD, TITLE } from '../../Constants/strings';

const LoginSchema = Yup.object().shape({
  email: SignupSchema.fields.email,
  password: SignupSchema.fields.password,
});

function Login({navigation}: LoginScreenProps) {
  const {isLoading, signInCall} = useAuthentication();
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  const handleLogin = async (values: FormValues) => {
    await signInCall({email: values.email, password: values.password});
  };

  const handleForgotP = () => {
    navigation.navigate(NAVIGATION.FORGOTPASS);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={65}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper(colors)}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={values => handleLogin(values)}>
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
              handleChange={handleChange(CONSTANTS.EMAIL)}
              handleBlur={() => setFieldTouched(CONSTANTS.EMAIL)}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorTxt}>{errors.email}</Text>
            )}

            <CustomInput
              placeHolder={SIGNING.SETPASSWORD}
              value={values.password}
              handleChange={handleChange(CONSTANTS.PASSWORD)}
              handleBlur={() => setFieldTouched(CONSTANTS.PASSWORD)}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorTxt}>{errors.password}</Text>
            )}

            <View style={loginStyles.button}>
              <TouchableOpacity onPress={handleForgotP}>
                <Text style={loginStyles.forgotTxt}>{FORGOT_PASSOWRD.FORGOT}</Text>
              </TouchableOpacity>
            </View>

            <View style={loginStyles.bottom}>
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color={themeColors.LIGHT.BLUE}
                />
              ) : (
                <CustomButton
                  handleButton={handleSubmit}
                  text={TITLE.LOGIN}
                  disable={!isValid}
                />
              )}
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}

export default Login;
