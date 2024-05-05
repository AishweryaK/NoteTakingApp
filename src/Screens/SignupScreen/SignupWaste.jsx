// import React from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert , KeyboardAvoidingView} from "react-native";
// import { styles } from "./styles";
// import { SIGNING } from "../../Constants/signingConstants";
// import { Formik } from "formik";
// import * as Yup from 'yup';
// import { firebase } from "@react-native-firebase/auth";
// import { NAVIGATION } from "../../Constants/navConstants";
// import firestore from "@react-native-firebase/firestore"

// const SignupSchema = Yup.object().shape({
//     firstName: Yup.string()
//       .min(3, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Please enter your first name'),
//     lastName: Yup.string()
//       .min(2, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Please enter your surname'),
//     email: Yup.string().email('Invalid email').required('Please enter your Email'),
//     password: Yup.string()
//     .min(8)
//     .required('Please enter a password')
//     .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
//     "Password should be atleast 8 characters long consisting of one or more uppercase, numbers and special characters"
// ),
//     confirmPassword : Yup.string()
//     .oneOf([Yup.ref('password')], "Your passwords do not match")
//     .required("Confirm password is required")
//   });


// function Signup ({navigation}) {

// //     handleSignUp = (values) => {
// //         firebase
// //           .auth()
// //           .createUserWithEmailAndPassword(values.email, values.password)
// //           .then(() => navigation.navigate(NAVIGATION.LOGIN))
// //           .catch(error =>{if (error.message.includes('[auth/email-already-in-use]')) {
// //             Alert.alert("Error", "The email address is already in use.");
// //         }
// //         else 
// //         Alert.alert("Error", error) 
// //     })
// //       }



// // const  handleSignUp = async (values) => {
// //     try {
// //   let userCredentials = await firebase.auth().createUserWithEmailAndPassword(
// //     values.email,
// //     values.password,
// //   );
// //   await userCredentials.user.updateProfile({
// //     displayName: values.firstName + ' ' + values.lastName,
// //   });
// //       console.log('User account created & signed in!', userCredentials);
// //     } catch (error) {
// //       console.error('Error creating account:', error.code, error.message);
// //     }
// //   };

// const handleSignUp = async (values) => {
//     try {
//       let userCredentials = await firebase.auth().createUserWithEmailAndPassword(
//         values.email,
//         values.password,
//       );
      

//           const user = userCredentials.user;
//           await firestore().collection('users').doc(user.uid).collection('notes').add({
//             title:"",
//             desc:"",
//           });

//         console.log('User account created & signed in!', userCredentials.user);

//       navigation.navigate(NAVIGATION.LOGIN);
  
//     //   // Ensure user is successfully created
//     //   if (userCredentials && userCredentials.user) {
//     //     // Update user profile
//     //     await firebase.auth().userCredentials.user.updateProfile({
//     //     //   displayName: values.firstName + ' ' + values.lastName,
//     //     displayName:"hi"
//     //     });
//     //   } else {
//     //     console.error('User creation failed, no user returned.');
//     //   }
//     } catch (error) {
//       console.error('Error creating account:', error.code, error.message);
//     }
//   };
  

      
//     //   const handleSignUp = (values) => {
//     //     firebase
//     //       .auth()
//     //       .createUserWithEmailAndPassword(values.email, values.password)
//     //       .then((userCredential) => {
//     //         const user = userCredential.user;
//     //         console.log(JSON.stringify(user), "HELLOO  USERRR")
//     //         const userData = {
//     //           firstName:  values.firstName,
//     //           lastName : values.lastName,
             
//     //         };
//     //         database().ref('users/' + user.uid).set(userData)
//     //           .then(() => {
//     //             navigation.navigate(NAVIGATION.LOGIN);
//     //           })
//     //           .catch((error) => {
//     //             console.error("Error writing user data to database: ", error);
//     //           });
//     //       })

//     //       .catch((error) => {
//     //         // console.error("Error creating user: ", error);
//     //         Alert.alert("Error creating user: ", error)
//     //       });
//     //   }

     
      

//     return (
    
//         <Formik initialValues={{
//             firstName:"",
//             lastName:"",
//             email:"",
//             dob:"",
//             phonenum:"",
//             password:"",
//             confirmPassword:"",   
//         }}
//         validationSchema={SignupSchema}
//         onSubmit={values => handleSignUp(values)}
//         > 

//         {({values,errors,touched, handleChange, setFieldTouched, isValid, handleSubmit})=> (


      
//         <KeyboardAvoidingView
//     //   keyboardVerticalOffset={30}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.wrapper}>
//             <View style={styles.formContainer}>


//             <Text style={styles.title}>
//                 Sign Up
//             </Text>

            

//             <View style={styles.inputWrapper} >

//             <TextInput style={styles.inputStyle}
//             placeholder= {SIGNING.FIRSTNAME} 
//             value={values.firstName}
//             onChangeText={handleChange("firstName")}
//             onBlur={()=>setFieldTouched("firstName")}  />

//             { touched.firstName &&
//                 errors.firstName && (
//                     <Text style={styles.errorTxt}>
//                         {errors.firstName}
//                     </Text>
//                 )
//             }
//             </View>


//             <View style={styles.inputWrapper} >

//             <TextInput style={styles.inputStyle}
//             placeholder= {SIGNING.LASTNAME} 
//             value={values.lastName}
//             onChangeText={handleChange("lastName")}
//             onBlur={()=>setFieldTouched("lastName")}  />

//             {touched.lastName &&
//                 errors.lastName && (
//                     <Text style={styles.errorTxt}>
//                         {errors.lastName}
//                     </Text>
//                 )
//             }
//             </View>


//             <View style={styles.inputWrapper} >

//             <TextInput style={styles.inputStyle}
//             placeholder= {SIGNING.EMAIL} 
//             value={values.email}
//             onChangeText={handleChange("email")}
//             onBlur={()=>setFieldTouched("email")}  />

//             { touched.email &&
//                 errors.email && (
//                     <Text style={styles.errorTxt}>
//                         {errors.email}
//                     </Text>
//                 )
//             }
//             </View>


//             {/* <View style={styles.inputWrapper} >

//             <TextInput style={styles.inputStyle}
//             placeholder= {SIGNING.DOB} 
//             value={values.firstName}
//             onChangeText={handleChange("firstName")}  />

//             {
//                 errors.firstName && (
//                     <Text style={styles.errorTxt}>
//                         {errors.firstName}
//                     </Text>
//                 )
//             }
//             </View> */}


//             {/* <View style={styles.inputWrapper} >

//             <TextInput style={styles.inputStyle}
//             placeholder= {SIGNING.PHONENUM} 
//             value={values.firstName}
//             onChangeText={handleChange("firstName")}  />

//             {
//                 errors.firstName && (
//                     <Text style={styles.errorTxt}>
//                         {errors.firstName}
//                     </Text>
//                 )
//             }
//             </View> */}

//              <View style={styles.inputWrapper} >

//             <TextInput style={styles.inputStyle}
//             placeholder= {SIGNING.SETPASSWORD} 
//             value={values.password}
//             onChangeText={handleChange("password")}
//             onBlur={()=>setFieldTouched("password")}  />

//             {touched.password &&
//                 errors.password && (
//                     <Text style={styles.errorTxt}>
//                         {errors.password}
//                     </Text>
//                 )
//             }
//             </View>

//              <View style={styles.inputWrapper} >

//             <TextInput style={styles.inputStyle}
//             placeholder= {SIGNING.CONFIRMPASSWORD} 
//             value={values.confirmPassword}
//             onChangeText={handleChange("confirmPassword")}  />

//             { touched.confirmPassword &&
//                 errors.confirmPassword && (
//                     <Text style={styles.errorTxt}>
//                         {errors.confirmPassword}
//                     </Text>
//                 )
//             }
//             </View>

//             {/* <TouchableOpacity 
//             onPress={handleSubmit}
//             style={[styles.submitBtn, {backGroundColor: isValid? "#395B64" :"#A5C9CA" }]}
//             disabled={!isValid}
//             >
//                 <Text style={styles.submitBtnTxt}>
//                     Submit
//                 </Text>
//             </TouchableOpacity> */}
//             <TouchableOpacity
//             style={[styles.submitBtn, {backgroundColor: isValid? "#3A1B6B" :"#BCA0DC" }]}
//             onPress={handleSubmit}
//             disabled={!isValid}
//             >
//                 <Text style={styles.submitBtnTxt}>
//                     Submit
//                 </Text>

//             </TouchableOpacity>

//             </View>
//         </KeyboardAvoidingView>
//          )} 

//         </Formik>
//     )
// }

// export default Signup;