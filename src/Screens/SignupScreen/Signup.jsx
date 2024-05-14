import React , {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {SIGNING} from '../../Constants/signingConstants';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {firebase} from '@react-native-firebase/auth';
import {NAVIGATION} from '../../Constants/navConstants';
import firestore from '@react-native-firebase/firestore';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import { addDocumentsForUser } from '../../Common/firebaseUtils';
import ProfileImage from '../../Components/ProfileImage';
import { APPCOLOR } from '../../Assets/Colors/appColors';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your first name')
    .matches(/^[A-Za-z]+$/gi, "First Name should only contain alphabets") ,
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your surname')
    .matches(/^[A-Za-z]+$/gi, "Last Name should only contain alphabets") ,
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your Email'),
  password: Yup.string()
    .min(8)
    .required('Please enter a password')
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      'Password should be atleast 8 characters long consisting of one or more uppercase, numbers and special characters',
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Your passwords do not match')
    .required('Confirm password is required'),
});

function Signup({navigation}) {
  const [imageUri, setImageUri]=  useState(""); //
  const [loading, setLoading] = useState(false);

  const handleImageChange = (uri) => { //
    setImageUri(uri);
  };

  // console.log(imageUri);

  const handleSignUp = async values => {
    setLoading(true);
    try {
      let userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password);

      const user = userCredentials.user;

      // await firestore()
      //   .collection('users')
      //   .doc(user.uid)
      //   .collection('Personal')
      //   .add({
      //     title: '',
      //     desc: '',
      //   });

     
  
    await addDocumentsForUser(user.uid);    
        
      // await firestore()
      // .collection('users')
      // .doc(user.uid)
      // .collection('notes')
      // .add({})
      // ;

      //  await firestore()
      //   .collection('users')
      //   .doc(user.uid)
      //   .collection('labels')
      //   .add({
      //   });

      console.log('User account created & signed in!', userCredentials.user);

      if (userCredentials && userCredentials.user) {
        console.log(userCredentials, 'userrrr');
        await userCredentials.user.updateProfile({
            displayName: values.firstName + ' ' + values.lastName,
            photoURL: imageUri,   //
        });
      } else {
        console.error('User creation failed, no user returned.');
      }
      navigation.navigate(NAVIGATION.LOGIN);
    } catch (error) {
      setLoading(false);
      console.error('Error creating account:', error.code, error.message);
    } finally {
      setLoading(false);
    }
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
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.wrapper}
          keyboardVerticalOffset={100}>  
          <ScrollView style={{marginBottom: 10}}>

            {/* <ProfileImage /> */}
            <ProfileImage onImageChange={handleImageChange} />  
            
            <CustomInput
              placeHolder={SIGNING.FIRSTNAME}
              value={values.firstName}
              handleChange={handleChange('firstName')}
              handleBlur={() => setFieldTouched('firstName')}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorTxt}>{errors.firstName}</Text>
            )}

            <CustomInput
              placeHolder={SIGNING.LASTNAME}
              value={values.lastName}
              handleChange={handleChange('lastName')}
              handleBlur={() => setFieldTouched('lastName')}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorTxt}>{errors.lastName}</Text>
            )}

            <CustomInput
              placeHolder={SIGNING.EMAIL}
              value={values.email}
              handleChange={handleChange('email')}
              handleBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorTxt}>{errors.email}</Text>
            )}

            <CustomInput
              placeHolder={SIGNING.SETPASSWORD}
              value={values.password}
              handleChange={handleChange('password')}
              handleBlur={() => setFieldTouched('password')}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorTxt}>{errors.password}</Text>
            )}

            <CustomInput
              placeHolder={SIGNING.CONFIRMPASSWORD}
              value={values.confirmPassword}
              handleChange={handleChange('confirmPassword')}
              handleBlur={() => setFieldTouched('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
            )}

            {/* <TouchableOpacity
                            style={[styles.submitBtn, { backgroundColor: isValid ? "#3A1B6B" : "#BCA0DC" }]}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.submitBtnTxt}>
                                Submit
                            </Text>

                        </TouchableOpacity> */}
          </ScrollView>
          <View style={styles.bottom}>
          {loading ? (
              <ActivityIndicator size="large" color={APPCOLOR.BLUE} />
            ) : (
            <CustomButton
              // style={{backgroundColor: isValid ? APPCOLOR.BLUE : APPCOLOR.LIGHT_BLUE}}
              handleButton={handleSubmit}
              disable={!isValid}
              text="Submit"
            />)}

          </View>

        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

export default Signup;
