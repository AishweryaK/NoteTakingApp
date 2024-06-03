import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { getThemeColors, themeColors } from '../../Assets/Colors/themeColors';
import CustomInput from '../../Components/CustomInput';
import { SignupSchema } from '../SignupScreen/Signup';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomButton from '../../Components/CustomButton';
import { SIGNING } from '../../Constants/signingConstants';
import { loginStyles } from '../LoginScreen/loginStyles';

const ChangePSchema = Yup.object().shape({
  password: SignupSchema.fields.password,
  confirmPassword: SignupSchema.fields.confirmPassword,
});

const ChangePasswordModal = ({ visible, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {theme} = useSelector(state=> state.user);
  const colors = getThemeColors(theme);

  const reauthenticate = async (currentPassword) => {
    const user = auth().currentUser;
    const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
    try {
      await user.reauthenticateWithCredential(credential);
    } catch (error) {
      throw new Error('Current password is incorrect');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }
    else if(currentPassword=="" || newPassword=="" || confirmPassword=="")
      {
        Alert.alert('Error', 'Please fill in all the fields.');
        return;
      }
    try {
      await reauthenticate(currentPassword);
      const user = auth().currentUser;
      await user.updatePassword(newPassword);
      Alert.alert('Success', 'Password changed successfully');
      onClose();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleP = () => {
    onClose();
    setConfirmPassword("");
    setCurrentPassword("");
    setNewPassword("");
  }

  return (
        <KeyboardAvoidingView
    keyboardVerticalOffset={65}
    behavior={Platform.OS === 'ios' ? 'padding' : ''}
    style={styles.wrapper(colors)}>
    <Formik
      initialValues={{
        password: '',
        confirmPassword:"",
      }}
      validationSchema={ChangePSchema} 
      onSubmit={values => handleLogin(values)}>
      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
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
          {/* <CustomInput placeHolder={"Current Password"}
          value={currentPassword}
          handleChange={setCurrentPassword}
          /> */}

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
          

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button(colors)} onPress={handleP}>
              <Text style={styles.buttonText(colors)}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button(colors)} onPress={handleChangePassword}>
              <Text style={styles.buttonText(colors)}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
          )}
    </Formik>
  </KeyboardAvoidingView>

  //   <KeyboardAvoidingView
  //   keyboardVerticalOffset={65}
  //   behavior={Platform.OS === 'ios' ? 'padding' : ''}
  //   style={styles.wrapper(colors)}>
  //   <Formik
  //     initialValues={{
  //       email: '',
  //       password: '',
  //     }}
  //     validationSchema={ChangePSchema} 
  //     onSubmit={values => handleLogin(values)}>
  //     {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
  //       <>
  //         <CustomInput
  //           placeHolder={SIGNING.EMAIL}
  //           value={values.email}
  //           handleChange={handleChange('email')}
  //           handleBlur={() => setFieldTouched('email')}
  //         />
  //         {touched.email && errors.email && (
  //           <Text style={styles.errorTxt}>{errors.email}</Text>
  //         )}

  //         <CustomInput
  //           placeHolder={SIGNING.SETPASSWORD}
  //           value={values.password}
  //           handleChange={handleChange('password')}
  //           handleBlur={() => setFieldTouched('password')}
  //         />
  //         {touched.password && errors.password && (
  //           <Text style={styles.errorTxt}>{errors.password}</Text>
  //         )}


  //         {/* <View style={loginStyles.button}>
  //           <TouchableOpacity onPress={handleForgotP}>
  //             <Text style={loginStyles.forgotTxt}>Forgot Password?</Text>
  //           </TouchableOpacity>
  //         </View> */}

  //         <View style={loginStyles.bottom}>
  //         {isLoading ? (
  //           <ActivityIndicator size="large" color={themeColors.LIGHT.BLUE} />
  //         ) : (
  //           <CustomButton
  //             handleButton={handleSubmit}
  //             text={'Log in'}
  //             disable={!isValid}
  //           /> )}
  //         </View>

          
  //       </>
  //     )}
  //   </Formik>
  // </KeyboardAvoidingView>
  );
};

export default ChangePasswordModal;
