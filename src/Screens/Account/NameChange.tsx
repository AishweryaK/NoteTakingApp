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
import {SignupSchema} from '../SignupScreen/Signup';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {NameChangeProps} from '.';
import {CONSTANTS, NAME_CHANGE} from '../../Constants/strings';
import useFirebaseUtils from '../../Components/CustomHook/profileHooks';

const AccountSchema = Yup.object().shape({
  firstName: SignupSchema.fields.firstName,
  lastName: SignupSchema.fields.lastName,
});

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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.wrapper(colors)}>
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
            <View style={styles.modalContainer}>
              <View style={styles.modalContent(colors)}>
                <Text style={styles.modalTitle(colors)}>
                  {NAME_CHANGE.USERNAME_CHANGE}
                </Text>

                <TextInput
                  style={styles.input(colors)}
                  placeholder={NAME_CHANGE.FIRST_NAME}
                  value={values.firstName}
                  onChangeText={handleChange(CONSTANTS.FIRST_NAME)}
                  placeholderTextColor={colors.HEADERTITLE}
                  onBlur={() => setFieldTouched(CONSTANTS.FIRST_NAME)}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorTxt}>{errors.firstName}</Text>
                )}

                <TextInput
                  style={styles.input(colors)}
                  placeholder={NAME_CHANGE.LAST_NAME}
                  value={values.lastName}
                  onChangeText={handleChange(CONSTANTS.LAST_NAME)}
                  placeholderTextColor={colors.HEADERTITLE}
                  onBlur={() => setFieldTouched(CONSTANTS.LAST_NAME)}
                />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorTxt}>{errors.lastName}</Text>
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
                          {NAME_CHANGE.CANCEL}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.button(colors)}
                        onPress={() => handleSubmit()}
                        disabled={!isValid}>
                        <Text style={styles.buttonText(colors)}>
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

export default NameChange;
