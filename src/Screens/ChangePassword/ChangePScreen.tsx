import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {styles} from './styles';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors, Theme} from '../../Assets/Colors/themeColors';
import {SignupSchema} from '../SignupScreen/Signup';
import * as Yup from 'yup';
import {Formik, FormikHelpers} from 'formik';
import {FormValues, PasswordProps} from '.';
import {
  CHANGE_PASSWORD,
  CONSTANTS,
  ERR_MSG,
  ERR_TITLE,
} from '../../Constants/strings';
import {showAlert} from '../../Common/alert';

const ChangePSchema = Yup.object().shape({
  password: SignupSchema.fields.password,
  confirmPassword: SignupSchema.fields.confirmPassword,
});

const ChangePasswordModal: React.FC<PasswordProps> = ({visible, onClose}) => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const {theme} = useReduxSelector(state => state.user);
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
    {resetForm}: FormikHelpers<FormValues>,
  ) => {
    if (currentPassword === values.password) {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.PASSWORD_SAME);
      resetForm();
      return;
    }
    if (
      currentPassword === '' ||
      values.password === '' ||
      values.confirmPassword === ''
    ) {
      showAlert(ERR_TITLE.ERROR, ERR_MSG.FILL_ALL_FIELDS);
      return;
    }

    setIsLoading(true);
    try {
      await reauthenticate(currentPassword);
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
    setCurrentPassword('');
    resetForm();
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={65}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper(colors)}>
      <Formik
        initialValues={{
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

                <TextInput
                  style={styles.input(colors)}
                  placeholder={CHANGE_PASSWORD.CURRENT}
                  secureTextEntry={true}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholderTextColor={colors.HEADERTITLE}
                />
                <TextInput
                  style={styles.input(colors)}
                  placeholder={CHANGE_PASSWORD.NEW}
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange(CONSTANTS.PASSWORD)}
                  placeholderTextColor={colors.HEADERTITLE}
                  onBlur={() => setFieldTouched(CONSTANTS.PASSWORD)}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorTxt}>{errors.password}</Text>
                )}

                <TextInput
                  style={styles.input(colors)}
                  placeholder={CHANGE_PASSWORD.CONFIRM_NEW}
                  secureTextEntry={true}
                  value={values.confirmPassword}
                  onChangeText={handleChange(CONSTANTS.CONFIRM_PASSWORD)}
                  placeholderTextColor={colors.HEADERTITLE}
                  onBlur={() => setFieldTouched(CONSTANTS.CONFIRM_PASSWORD)}
                />
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
                        style={styles.button(colors)}
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
