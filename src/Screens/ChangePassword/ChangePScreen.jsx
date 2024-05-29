import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import { useSelector } from 'react-redux';
import { getThemeColors } from '../../Assets/Colors/themeColors';
import CustomInput from '../../Components/CustomInput';

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

  return (
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
            value={newPassword}
            onChangeText={setNewPassword}
            placeholderTextColor={colors.HEADERTITLE}
          />

          <TextInput
            style={styles.input(colors)}
            placeholder="Confirm New Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholderTextColor={colors.HEADERTITLE}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button(colors)} onPress={onClose}>
              <Text style={styles.buttonText(colors)}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button(colors)} onPress={handleChangePassword}>
              <Text style={styles.buttonText(colors)}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;
