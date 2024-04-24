// import React, { useEffect, useState } from "react";
// import { Alert, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { NAVIGATION } from "../../Constants/navConstants";
// import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";

// // import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// // import { RootStackParamList } from "../../Navigation/routeTypes";
// // import { LoginScreenProps } from "../../Navigation/routeTypes";


// // type LoginScreenProps = {
// //     navigation: NativeStackNavigationProp<RootStackParamList, "LOGIN">;
// //     // route: RouteProp<RootStackParamList, "Profile">;
// //   };
  

// // function Login({ navigation }: LoginScreenProps) {
//     function Login({navigation}) {
// //         const [email, setEmail]= useState("");
// //         const [loggedIn, setloggedIn] = useState(false);
//            const [userInfo, setuserInfo] = useState(null);

// useEffect(() => {
//     GoogleSignin.configure({
//       // scopes: ['email'], 
//       // webClientId:
//       //   '630539047377-i4h0t8ampr79c34ohkh57niu1ljb4re9.apps.googleusercontent.com',
//       // offlineAccess: true, 
//     });
//   }, []);

//     // const handlePress = () =>  {
//     //     navigation.navigate(NAVIGATION.HOMESCREEN)
//     // }

//    const signIn = async () => {
//         try {
//           await GoogleSignin.hasPlayServices();
//           const usrInfo = await GoogleSignin.signIn();
//           setuserInfo(usrInfo);
//         } catch (error) {
//           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             Alert.alert('Cancel');
//           } else if (error.code === statusCodes.IN_PROGRESS) {
//             Alert.alert('Signin in progress');
//           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
//           } else {
           
//           }
//         }
//       };

//       const signOut = async () => {
//         try {
//           await GoogleSignin.revokeAccess();
//           await GoogleSignin.signOut();
//           // setloggedIn(false);
//           // setuserInfo([]);
//           setuserInfo(null);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//     return (
//         // <View>
//         //     <Text>
//         //         hello.
//         //     </Text>
//         //     <TextInput onChangeText={(input)=>setEmail(input)}>
//         //     </TextInput>
//         //     <TouchableOpacity onPress={handlePress} style={{borderWidth:2}}>
//         //         <Text> press me </Text>
//         //     </TouchableOpacity>

//         // </View>
//         <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView style={{flex:1, alignItems:"center" }}>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//         //   style={styles.scrollView}
//           >

//           <View 
//         //   style={styles.body}
//           >
//             <View 
//             // style={styles.sectionContainer}
//             >
//               <GoogleSigninButton
//                 style={{width: 192, height: 48}}
//                 size={GoogleSigninButton.Size.Wide}
//                 color={GoogleSigninButton.Color.Dark}
//                 onPress={signIn}
//               />
//             </View>
//             <View 
//             // style={styles.buttonContainer}
//             >
//               {/* {!loggedIn && <Text>You are currently logged out</Text>} */}
              
//                 <TouchableOpacity
//                   onPress={signOut}>
//                     <Text style={{color:"red"}}>
//                         LogOut
//                     </Text>
//                   </TouchableOpacity>
              
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//     )
// }

// export default Login;



  // const signInBTNPress = async () => {
  //   console.log("hehehie");
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const usrInfo = await GoogleSignin.signIn();
  //     setuserInfo(usrInfo);
  //   } catch (error) {
  //     console.log(error, 'Error during sign-in');
  //   }
  // };

  //  const signInBTNPress = async () => {
  //   console.log("hehehie");
  //       try {
  //         await GoogleSignin.hasPlayServices();
  //         GoogleSignin.signIn().then((usrInfo)=>{
  //           setuserInfo(usrInfo);
  //         }).catch((err)=>{
  //           console.log(err,'jhBShabschb111222333')
  //         })
  //       } catch (error) {
  //         console.log(error,'jhBShabschb')
  //         // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //         //   Alert.alert('Cancel');
  //         // } else if (error.code === statusCodes.IN_PROGRESS) {
  //         //   Alert.alert('Signin in progress');
  //         // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //         //   Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
  //         // } else {
  //         //   Alert.alert('um');
  //         // }
  //       }
  //     };