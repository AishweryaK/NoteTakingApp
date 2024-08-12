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
import {SignupSchema} from '../../Common/validationSchema';

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
          behavior={Platform.OS === CONSTANTS.IOS ? 'padding' : undefined}
          style={styles(colors).wrapper}
          keyboardVerticalOffset={100}>
          <ScrollView style={styles(colors).margin}>
            <View style={styles(colors).view}>
              <ProfileImage onImageChange={handleImageChange} />

              <CustomInput
                placeHolder={SIGNING.FIRSTNAME}
                value={values.firstName}
                handleChange={handleChange(CONSTANTS.FIRST_NAME)}
                handleBlur={() => setFieldTouched(CONSTANTS.FIRST_NAME)}
              />
              {touched.firstName && errors.firstName && (
                <Text style={styles(colors).errorTxt}>{errors.firstName}</Text>
              )}

              <CustomInput
                placeHolder={SIGNING.LASTNAME}
                value={values.lastName}
                handleChange={handleChange(CONSTANTS.LAST_NAME)}
                handleBlur={() => setFieldTouched(CONSTANTS.LAST_NAME)}
              />
              {touched.lastName && errors.lastName && (
                <Text style={styles(colors).errorTxt}>{errors.lastName}</Text>
              )}

              <CustomInput
                placeHolder={SIGNING.EMAIL}
                value={values.email}
                handleChange={handleChange(CONSTANTS.EMAIL)}
                handleBlur={() => setFieldTouched(CONSTANTS.EMAIL)}
              />
              {touched.email && errors.email && (
                <Text style={styles(colors).errorTxt}>{errors.email}</Text>
              )}

              <CustomInput
                placeHolder={SIGNING.SETPASSWORD}
                value={values.password}
                handleChange={handleChange(CONSTANTS.PASSWORD)}
                handleBlur={() => setFieldTouched(CONSTANTS.PASSWORD)}
                isPassword={true}
              />
              {touched.password && errors.password && (
                <Text style={[styles(colors).errorTxt, {paddingRight: 15}]}>
                  {errors.password}
                </Text>
              )}

              <CustomInput
                placeHolder={SIGNING.CONFIRMPASSWORD}
                value={values.confirmPassword}
                handleChange={handleChange(CONSTANTS.CONFIRM_PASSWORD)}
                handleBlur={() => setFieldTouched(CONSTANTS.CONFIRM_PASSWORD)}
                isPassword={true}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles(colors).errorTxt}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
          </ScrollView>
          <View style={styles(colors).bottom}>
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
