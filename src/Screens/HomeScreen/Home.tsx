import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../../Assets/Svgs/MenuIcon";
import BottomNavigation from "../../Navigation/bottomTab";

function Home({navigation}) : React.JSX.Element{
    // const navigation = useNavigation();
    const handleAddNote =() =>{
        navigation.navigate(NAVIGATION.ADDNOTE)
    }

    return (
        <SafeAreaView style={{flex:1}}>
          {/* <MenuIcon width={32} height={32} color={"pink"} backgroundColor={"purple"} /> */}
          <View style={{
    shadowColor: '#171717',
    // shadowColor:"pink",
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    position:"absolute", right:40, bottom:40, height:60, width:60, 
          borderRadius:30, backgroundColor:"black", justifyContent:"center",
          elevation:15,
  }}>

            <TouchableOpacity 
          // style={{position:"absolute", right:40, bottom:40, height:50, width:50, 
          // borderRadius:25, backgroundColor:"black", justifyContent:"center"}}
          onPress={handleAddNote}>
            <Text style={{color:"white", textAlign:"center", fontSize:25}}>
              +
            </Text>
          </TouchableOpacity>
         
            </View>
        </SafeAreaView>
    )
}

export default Home;