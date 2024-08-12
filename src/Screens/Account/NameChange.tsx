import React from 'react';
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
import {styles} from '../ChangePassword/styles';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {Formik} from 'formik';
import {NameChangeProps} from './account_screen';
import {CONSTANTS, NAME_CHANGE} from '../../Constants/strings';
import useFirebaseUtils from '../../Components/CustomHook/profileHooks';
import { AccountSchema } from '../../Common/validationSchema';

const NameChange: React.FC<NameChangeProps> = ({visible, onClose}) => {
  const {isLoading, handleNameChange} = useFirebaseUtils();
  const {theme, displayName} = useReduxSelector(state => state.user);
  const colors = getThemeColors(theme);

  const handleCancel = (resetForm: () => void) => {
    onClose();
    resetForm();
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={65}
      behavior={Platform.OS === CONSTANTS.IOS ? 'padding' : undefined}
      style={styles(colors).wrapper}>
      <Formik
        initialValues={{firstName: '', lastName: ''}}
        validationSchema={AccountSchema}
        onSubmit={(values, actions) =>
          handleNameChange(values, actions, displayName, onClose)
        }>
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
            <View style={styles(colors).modalContainer}>
              <View style={styles(colors).modalContent}>
                <Text style={styles(colors).modalTitle}>
                  {NAME_CHANGE.USERNAME_CHANGE}
                </Text>

                <TextInput
                  style={styles(colors).input}
                  placeholder={NAME_CHANGE.FIRST_NAME}
                  value={values.firstName}
                  onChangeText={handleChange(CONSTANTS.FIRST_NAME)}
                  placeholderTextColor={colors.HEADERTITLE}
                  onBlur={() => setFieldTouched(CONSTANTS.FIRST_NAME)}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles(colors).errorTxt}>
                    {errors.firstName}
                  </Text>
                )}

                <TextInput
                  style={styles(colors).input}
                  placeholder={NAME_CHANGE.LAST_NAME}
                  value={values.lastName}
                  onChangeText={handleChange(CONSTANTS.LAST_NAME)}
                  placeholderTextColor={colors.HEADERTITLE}
                  onBlur={() => setFieldTouched(CONSTANTS.LAST_NAME)}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles(colors).errorTxt}>{errors.lastName}</Text>
                )}

                <View style={styles(colors).buttonContainer}>
                  {isLoading ? (
                    <View style={styles(colors).activity}>
                      <ActivityIndicator size={'large'} color={colors.BLUE} />
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={[styles(colors).button,{backgroundColor:'red'}]}
                        onPress={() => handleCancel(resetForm)}>
                        <Text style={styles(colors).buttonText}>
                          {NAME_CHANGE.CANCEL}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles(colors).button}
                        onPress={() => handleSubmit()}
                        disabled={!isValid}>
                        <Text style={styles(colors).buttonText}>
                          {NAME_CHANGE.CHANGE}
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

export default React.memo(NameChange);
