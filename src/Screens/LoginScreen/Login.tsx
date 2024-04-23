import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RootStackParamList } from "../../Navigation/routeTypes";
// import { LoginScreenProps } from "../../Navigation/routeTypes";

// type LoginScreenProps = {
//     navigation: NativeStackNavigationProp<RootStackParamList, "LOGIN">;
//     // route: RouteProp<RootStackParamList, "Profile">;
//   };
  


// function Login({ navigation }: LoginScreenProps) {
    function Login({navigation}) {

    const handlePress = () =>  {
        navigation.navigate(NAVIGATION.HOMESCREEN)
    }

    return (
        <View>
            <Text>
                hello.
            </Text>
            <TouchableOpacity onPress={handlePress} style={{borderWidth:2}}>
                <Text> press me </Text>
            </TouchableOpacity>

        </View>
    )
}

export default Login;