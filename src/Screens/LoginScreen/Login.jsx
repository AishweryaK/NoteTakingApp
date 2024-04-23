import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";

// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../Navigation/routeTypes";
// import { LoginScreenProps } from "../../Navigation/routeTypes";


// type LoginScreenProps = {
//     navigation: NativeStackNavigationProp<RootStackParamList, "LOGIN">;
//     // route: RouteProp<RootStackParamList, "Profile">;
//   };
  


// function Login({ navigation }: LoginScreenProps) {
    function Login({navigation}) {
        const [email, setEmail]= useState("");
        const [loggedIn, setloggedIn] = useState(false);
const [userInfo, setuserInfo] = useState([]);

useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], 
      webClientId:
        '630539047377-i4h0t8ampr79c34ohkh57niu1ljb4re9.apps.googleusercontent.com',
      offlineAccess: true, 
    });
  }, []);

    const handlePress = () =>  {
        navigation.navigate(NAVIGATION.HOMESCREEN)
    }

   const _signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const {accessToken, idToken} = await GoogleSignin.signIn();
          setloggedIn(true);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            Alert.alert('Cancel');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            Alert.alert('Signin in progress');
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
          } else {
           
          }
        }
      };

      const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          setloggedIn(false);
          setuserInfo([]);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        // <View>
        //     <Text>
        //         hello.
        //     </Text>
        //     <TextInput onChangeText={(input)=>setEmail(input)}>
        //     </TextInput>
        //     <TouchableOpacity onPress={handlePress} style={{borderWidth:2}}>
        //         <Text> press me </Text>
        //     </TouchableOpacity>

        // </View>
        <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        //   style={styles.scrollView}
          >

          <View 
        //   style={styles.body}
          >
            <View 
            // style={styles.sectionContainer}
            >
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={_signIn}
              />
            </View>
            <View 
            // style={styles.buttonContainer}
            >
              {!loggedIn && <Text>You are currently logged out</Text>}
              {loggedIn && (
                <TouchableOpacity
                  onPress={signOut}>
                    <Text style={{color:"red"}}>
                        LogOut
                    </Text>
                  </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
    )
}

export default Login;