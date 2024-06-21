import React, {useState} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../Components/CustomInput/CustomInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import ProfileImage from '../../Components/ProfileImage/ProfileImage';
import useAuthentication from '../../Components/CustomHook/authHook';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {SIGNING} from '../../Constants/signingConstants';
import {styles} from './styles';
import {FormValues} from './signup_screen';
import {CONSTANTS, SIGN_UP} from '../../Constants/strings';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .transform(value => value.trim())
    .test(SIGN_UP.TRIM_TWO, SIGN_UP.BLANK_SPACE, value => (value || "").length > 0)
    .min(3, SIGN_UP.TOO_SHORT)
    .max(25, SIGN_UP.TOO_LONG)
    .required(SIGN_UP.ENTER_FIRST_NAME)
    .matches(SIGN_UP.NAME_REGEX, SIGN_UP.ONLY_FN_ALPHABETS),
  lastName: Yup.string()
    .transform(value => value.trim())
    .test(SIGN_UP.TRIM_TWO, SIGN_UP.BLANK_SPACE_LAST, value => (value || "").length > 0)
    .min(2, SIGN_UP.TOO_SHORT)
    .max(25, SIGN_UP.TOO_LONG)
    .required(SIGN_UP.ENTER_LAST_NAME)
    .matches(SIGN_UP.NAME_REGEX, SIGN_UP.ONLY_LN_ALPHABET),
  email: Yup.string()
    .transform(value => value.trim())
    .test(SIGN_UP.TRIM_TWO, SIGN_UP.BLANK_SPACE_EMAIL, value => (value || "").length > 0)
    .email(SIGN_UP.INVALID_EMAIL)
    .required(SIGN_UP.ENTER_EMAIL)
    .matches(SIGN_UP.EMAIL_REGEX, SIGN_UP.INVALID_EMAIL),
  password: Yup.string()
    .transform(value => value.trim())
    .test(SIGN_UP.TRIM_TWO, SIGN_UP.BLANK_SPACE_PWD, value => (value || "").length > 0)
    .min(8)
    .max(25)
    .required(SIGN_UP.ENTER_PASSWORD)
    .matches(SIGN_UP.PASSWORD_REGEX, SIGN_UP.PWD_TEXT),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref(SIGN_UP.CONFIRM_PWD_REGEX)], SIGN_UP.PWD_DONT_MATCH)
    .required(SIGN_UP.PWD_REQUIRED),
});

const Signup: React.FC = () => {
  const [imageUri, setImageUri] = useState<string>('');
  const {isLoading, signUpCall} = useAuthentication();
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  const handleImageChange = (uri: string) => {
    setImageUri(uri);
  };

  const handleSignUp = async (values: FormValues) => {
    await signUpCall({
      email: values.email.trim(),
      password: values.password.trim(),
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      imageUri: imageUri,
    });
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
      }: FormikProps<FormValues>) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.wrapper(colors)}
          keyboardVerticalOffset={100}>
          <ScrollView style={styles.margin}>
            <View style={styles.view}>
              <ProfileImage onImageChange={handleImageChange} />

              <CustomInput
                placeHolder={SIGNING.FIRSTNAME}
                value={values.firstName}
                handleChange={handleChange(CONSTANTS.FIRST_NAME)}
                handleBlur={() => setFieldTouched(CONSTANTS.FIRST_NAME)}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorTxt}>{errors.firstName}</Text>
              )}

              <CustomInput
                placeHolder={SIGNING.LASTNAME}
                value={values.lastName}
                handleChange={handleChange(CONSTANTS.LAST_NAME)}
                handleBlur={() => setFieldTouched(CONSTANTS.LAST_NAME)}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles.errorTxt}>{errors.lastName}</Text>
              )}

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

              <CustomInput
                placeHolder={SIGNING.CONFIRMPASSWORD}
                value={values.confirmPassword}
                handleChange={handleChange(CONSTANTS.CONFIRM_PASSWORD)}
                handleBlur={() => setFieldTouched(CONSTANTS.CONFIRM_PASSWORD)}
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
                text={SIGN_UP.SUMBIT}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default Signup;
