// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import { NAVIGATION } from "../../Constants/navConstants";
// import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import MenuIcon from "../../Assets/Svgs/MenuIcon";
// import BottomNavigation from "../../Navigation/bottomTab";
// import { styles } from "../SignupScreen/styles";
// import { homeStyles } from "./homeStyle";

// function Home({navigation}) : React.JSX.Element{
//     // const navigation = useNavigation();
//     const handleAddNote =() =>{
//         navigation.navigate(NAVIGATION.ADDNOTE)
//     }

//     return (
//         <SafeAreaView style={styles.wrapper}>
//           {/* <MenuIcon width={32} height={32} color={"pink"} backgroundColor={"purple"} /> */}
//           <View style={homeStyles.buttonShadow}>

//             <TouchableOpacity 
//           // style={{position:"absolute", right:40, bottom:40, height:50, width:50, 
//           // borderRadius:25, backgroundColor:"black", justifyContent:"center"}}
//           onPress={handleAddNote}>
//             <Text style={homeStyles.buttonText}>
//               +
//             </Text>
//           </TouchableOpacity>
         
//             </View>
//         </SafeAreaView>
//     )
// }

// export default Home;