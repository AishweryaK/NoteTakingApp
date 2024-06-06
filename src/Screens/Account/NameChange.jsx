import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { styles } from '../ChangePassword/styles.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getThemeColors } from '../../Assets/Colors/themeColors';
import { SignupSchema } from '../SignupScreen/Signup';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { saveName, saveUser } from '../../Redux/Slices/demoSlice';

const AccountSchema = Yup.object().shape({
   firstName: SignupSchema.fields.firstName,
    lastName: SignupSchema.fields.lastName,
  });

const NameChange = ({ visible, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {theme, displayName} = useSelector(state=> state.user);
  const colors = getThemeColors(theme);
  const dispatch = useDispatch();

  const handleNameChange = async (values, {resetForm}) => {

    if(values.firstName.trim()=="" || values.lastName.trim()=="")
      {
        Alert.alert('Error', 'Please fill in all the fields.');
        return;
      }
      else if (`${values.firstName.trim()} ${values.lastName.trim()}` === displayName)
        { Alert.alert('Error', 'User Name same as before. Please try again.');
      return;}

    setIsLoading(true);
    try {
        const user = auth().currentUser;
        await user.updateProfile({
            displayName: `${values.firstName.trim()} ${values.lastName.trim()}`,
        });

        dispatch(saveName({
            displayName: `${values.firstName.trim()} ${values.lastName.trim()}`
        }));
        Alert.alert('Success', 'User Name changed successfully');
      resetForm();
      onClose();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    finally{
      setIsLoading(false);
    }
  };

  const handleN = (resetForm) => {
    onClose();
    resetForm();
  };

  return (
    <KeyboardAvoidingView
    keyboardVerticalOffset={65}
    behavior={Platform.OS === 'ios' ? 'padding' : ''}
    style={styles.wrapper(colors)}>
    <Formik
      initialValues={{
        firstName:"",
        lastName:"",
      }}
      validationSchema={AccountSchema} 
      onSubmit={handleNameChange}>
      {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, resetForm }) => (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent(colors)}>
          <Text style={styles.modalTitle(colors)}>Change User Name</Text>

          <TextInput
            style={styles.input(colors)}
            placeholder="Enter First Name"
            value={values.firstName}
            onChangeText={handleChange("firstName")}
            placeholderTextColor={colors.HEADERTITLE}
            onBlur={() => setFieldTouched('firstName')}
          />
           {touched.firstName && errors.firstName && (
              <Text style={styles.errorTxt}>{errors.firstName}</Text>
            )}

          <TextInput
            style={styles.input(colors)}
            placeholder="Enter Last Name"
            value={values.lastName}
            onChangeText={handleChange('lastName')}
            placeholderTextColor={colors.HEADERTITLE}
            onBlur={() => setFieldTouched('lastName')}
          />
           {touched.lastName && errors.lastName && (
              <Text style={styles.errorTxt}>{errors.lastName}</Text>
            )}

            
          <View style={styles.buttonContainer}>
          {
              isLoading? 
              <View style={styles.activity}>
              <ActivityIndicator size={"large"} color={colors.BLUE} 
               /> 
               </View>
              :
              <>
            <TouchableOpacity style={styles.button(colors)} onPress={()=>handleN(resetForm)}>
              <Text style={styles.buttonText(colors)}>Cancel</Text>
            </TouchableOpacity>

              <TouchableOpacity style={styles.button(colors)} 
              onPress={handleSubmit}
              disabled={!isValid}
              >
              <Text style={styles.buttonText(colors)}>Change Username</Text>
              </TouchableOpacity>
              </>
            }
           
          </View>
        </View>
      </View>
    </Modal>
          )}
    </Formik>
  </KeyboardAvoidingView>
  );
};

export default NameChange;
