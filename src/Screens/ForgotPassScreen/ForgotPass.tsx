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
import { FormValues } from './forgot_pass';
import { CONSTANTS, ERR_MSG, ERR_TITLE, FORGOT_PASSOWRD, TITLE } from '../../Constants/strings';
import { showAlert } from '../../Common/alert';
import { handleAuthError } from '../../Common/handleAuthErr';



const ForgotPassScreen: React.FC<ForgotPassScreenProps> = ({navigation}) => {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  const handleEmail = (values: FormValues) => {
    auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        showAlert(ERR_TITLE.EMAIL_SENT,ERR_MSG.SET_PASSWORD );
        navigation.navigate(NAVIGATION.LOGIN);
      })
      .catch(error => {
        const context = TITLE.FORGOT;
        handleAuthError(error, context)
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
              handleChange={handleChange(CONSTANTS.EMAIL)}
              handleBlur={() => setFieldTouched(CONSTANTS.EMAIL)}
            />

            {touched.email && errors.email && (
              <Text style={styles.errorTxt}>{errors.email}</Text>
            )}

            <View style={passStyles.bottom}>
              <CustomButton
                handleButton={handleSubmit}
                text={FORGOT_PASSOWRD.VERIFY}
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
