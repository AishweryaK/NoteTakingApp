import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

function Home({navigation}) : React.JSX.Element{
    // const navigation = useNavigation();
    const handleAddNote =() =>{
        navigation.navigate(NAVIGATION.ADDNOTE)
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <TouchableOpacity 
          style={{position:"absolute", right:40, bottom:40, height:50, width:50, 
          borderRadius:25, backgroundColor:"black", justifyContent:"center"}}
          onPress={handleAddNote}>
            <Text style={{color:"white", textAlign:"center", fontSize:25}}>
              +
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home;