import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { styles } from './styles';
import { useReduxSelector } from '../../Redux/Store/store';
import { getThemeColors, Theme, themeColors } from '../../Assets/Colors/themeColors';
import { SignupSchema } from '../SignupScreen/Signup';
import * as Yup from 'yup';
import { Formik, FormikHelpers } from 'formik';
import { FormValues, PasswordProps } from './change_p_screen';
import {
  CHANGE_PASSWORD,
  CONSTANTS,
  ERR_MSG,
  ERR_TITLE,
  SIGN_UP,
} from '../../Constants/strings';
import { showAlert } from '../../Common/alert';
import { ICONS } from '../../Constants/iconConstants';

const ChangePSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .transform((value: string) => value.trim())
    .test(
      SIGN_UP.TRIM_TWO,
      SIGN_UP.BLANK_SPACE,
      (value) => (value || '').length > 0
    )
    .required(SIGN_UP.ENTER_CURR_PWD),
  password: SignupSchema.fields.password,
  confirmPassword: SignupSchema.fields.confirmPassword,
});

const ChangePasswordModal: React.FC<PasswordProps> = ({ visible, onClose }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { theme } = useReduxSelector(state => state.user);
  const colors = getThemeColors(theme as Theme);

  const reauthenticate = async (currentPassword: string) => {
    const user = auth().currentUser;
    const credential = auth.EmailAuthProvider.credential(
      user!.email!,
      currentPassword,
    );
    try {
      await user?.reauthenticateWithCredential(credential);
    } catch (error) {
      throw new Error(ERR_MSG.PASSWORD_INCORRECT);
    }
  };

  const handleChangePassword = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    if (values.currentPassword === values.password) {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.PASSWORD_SAME);
      resetForm();
      return;
    }

    setIsLoading(true);
    try {
      await reauthenticate(values.currentPassword);
      const user = auth().currentUser;
      await user?.updatePassword(values.password);
      showAlert(ERR_TITLE.SUCCESS, ERR_MSG.CHANGED_PASSWORD);
      resetForm();
      onClose();
    } catch (e: any) {
      const error: FirebaseAuthTypes.NativeFirebaseAuthError = e;
      showAlert(ERR_TITLE.ERROR, error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (resetForm: () => void) => {
    onClose();
    resetForm();
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={65}
      behavior={Platform.OS === CONSTANTS.IOS ? 'padding' : undefined}
      style={styles.wrapper(colors)}>
      <Formik
        initialValues={{
          currentPassword: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={ChangePSchema}
        onSubmit={handleChangePassword}>
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          isValid,
          handleSubmit,
          resetForm,
        }) => (
          <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent(colors)}>
                <Text style={styles.modalTitle(colors)}>
                  {CHANGE_PASSWORD.CHANGE}
                </Text>

                <View style={styles.position}>
                  <TextInput
                    style={styles.input(colors)}
                    placeholder={CHANGE_PASSWORD.CURRENT}
                    secureTextEntry={!showCurrentPassword}
                    value={values.currentPassword}
                    onChangeText={handleChange(CONSTANTS.CURRENT_PASSWORD)}
                    placeholderTextColor={colors.HEADERTITLE}
                    onBlur={() => setFieldTouched(CONSTANTS.CURRENT_PASSWORD)}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? ICONS.EYEON(28, 28) : ICONS.EYEOFF(28, 28, themeColors.LIGHT.BLUE)}
                  </TouchableOpacity>
                </View>
                <View style={styles.align}>
                  {touched.currentPassword && errors.currentPassword && (
                    <Text style={styles.errorTxt}>{errors.currentPassword}</Text>
                  )}
                </View>

                <View style={styles.position}>
                  <TextInput
                    style={styles.input(colors)}
                    placeholder={CHANGE_PASSWORD.NEW}
                    secureTextEntry={!showNewPassword}
                    value={values.password}
                    onChangeText={handleChange(CONSTANTS.PASSWORD)}
                    placeholderTextColor={colors.HEADERTITLE}
                    onBlur={() => setFieldTouched(CONSTANTS.PASSWORD)}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? ICONS.EYEON(28, 28) : ICONS.EYEOFF(28, 28, themeColors.LIGHT.BLUE)}
                  </TouchableOpacity>
                </View>
                <View style={styles.align}>
                  {touched.password && errors.password && (
                    <Text style={[styles.errorTxt, { paddingRight: 15 }]}>{errors.password}</Text>
                  )}
                </View>

                <View style={styles.position}>
                  <TextInput
                    style={styles.input(colors)}
                    placeholder={CHANGE_PASSWORD.CONFIRM_NEW}
                    secureTextEntry={!showConfirmPassword}
                    value={values.confirmPassword}
                    onChangeText={handleChange(CONSTANTS.CONFIRM_PASSWORD)}
                    placeholderTextColor={colors.HEADERTITLE}
                    onBlur={() => setFieldTouched(CONSTANTS.CONFIRM_PASSWORD)}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? ICONS.EYEON(28, 28) : ICONS.EYEOFF(28, 28, themeColors.LIGHT.BLUE)}
                  </TouchableOpacity>
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
                )}

                <View style={styles.buttonContainer}>
                  {isLoading ? (
                    <View style={styles.activity}>
                      <ActivityIndicator size={'large'} color={colors.BLUE} />
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={[styles.button(colors), { backgroundColor: 'red' }]}
                        onPress={() => handleCancel(resetForm)}>
                        <Text style={styles.buttonText(colors)}>
                          {CHANGE_PASSWORD.CANCEL}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.button(colors)}
                        onPress={() => handleSubmit()}
                        disabled={!isValid}>
                        <Text style={styles.buttonText(colors)}>
                          {CHANGE_PASSWORD.CHANGE}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </View>
          </Modal>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordModal;
