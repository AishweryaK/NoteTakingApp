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
      throw new Error('Current password is incorrect');
    }
  };

  const handleChangePassword = async (
    values: FormValues,
    {resetForm}: FormikHelpers<FormValues>,
  ) => {
    if (currentPassword === values.password) {
      Alert.alert(
        'Error',
        'The new password cannot be the same as the current password.',
      );
      resetForm();
      return;
    }
    if (
      currentPassword === '' ||
      values.password === '' ||
      values.confirmPassword === ''
    ) {
      Alert.alert('Error', 'Please fill in all the fields.');
      return;
    }

    setIsLoading(true);
    try {
      await reauthenticate(currentPassword);
      const user = auth().currentUser;
      await user?.updatePassword(values.password);
      Alert.alert('Success', 'Password changed successfully');
      resetForm();
      onClose();
    } catch (e :any) {
      const error: FirebaseAuthTypes.NativeFirebaseAuthError = e;
      Alert.alert('Error', error.message);
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
                <Text style={styles.modalTitle(colors)}>Change Password</Text>

                <TextInput
                  style={styles.input(colors)}
                  placeholder="Current Password"
                  secureTextEntry={true}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholderTextColor={colors.HEADERTITLE}
                />
                <TextInput
                  style={styles.input(colors)}
                  placeholder="New Password"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholderTextColor={colors.HEADERTITLE}
                  onBlur={() => setFieldTouched('password')}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorTxt}>{errors.password}</Text>
                )}

                <TextInput
                  style={styles.input(colors)}
                  placeholder="Confirm New Password"
                  secureTextEntry={true}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholderTextColor={colors.HEADERTITLE}
                  onBlur={() => setFieldTouched('confirmPassword')}
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
                        <Text style={styles.buttonText(colors)}>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.button(colors)}
                        onPress={() => handleSubmit()}
                        disabled={!isValid}>
                        <Text style={styles.buttonText(colors)}>
                          Change Password
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
