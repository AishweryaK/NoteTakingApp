import React ,{useState, useEffect} from "react";
import { Text, TouchableOpacity, View, Image, ImageBackground } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
// import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuIcon from "../../Assets/Svgs/MenuIcon";
// import BottomNavigation from "../../Navigation/bottomTab";
import { styles } from "../SignupScreen/styles";
import { homeStyles } from "./homeStyle";
import auth from '@react-native-firebase/auth';
import { APPCOLOR } from "../../Assets/Colors/appColors";
import CircleIcon from "../../Assets/Svgs/CircleIcon";
import PersonalIcon from "../../Assets/Svgs/PersonalIcon";
import CustomLabel from "../../Components/CustomLabel";
import { dimensions } from "../../Constants/utility";
import AvailSpace from "./AvailSpace";

function Home({navigation}) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
          if (user) {
              setCurrentUser(user);
          } else {
              setCurrentUser(null);
          }
      });

      return () => unsubscribe();
  }, []);

    const handleAddNote =() =>{
      // console.log(currentUser.uid, "UIDd")
        navigation.navigate(NAVIGATION.ADDNOTE, {uid:currentUser.uid})
    }

    const handleUser = () => {
      const user = auth().currentUser;
      console.log(user, "THIS IS CURR USER")
    }

    const handlePress = () => {
      navigation.navigate(NAVIGATION.NOTESCREEN,{uid:currentUser.uid})
    }

    return (
        <SafeAreaView 
        style={homeStyles.safeArea}
        >
          {/* <TouchableOpacity
          onPress={handleUser}
          style={[styles.submitBtn, {backgroundColor:"#3A1B6B"} ]}>
          <Text style={styles.submitBtnTxt}> get current user </Text>
        </TouchableOpacity> */}

        <View style={homeStyles.outer}>
          <View style={homeStyles.inner}>
          <Text 
          style={homeStyles.welcome}>
            Welcome, {currentUser ? currentUser.displayName : ""}! 
            {/* {auth().currentUser.displayName} !  */}
            </Text>
            <Text
            style={homeStyles.title}>
              Notes App
            </Text>
        </View>
        {/* <Image 
        style={homeStyles.userImg}
        source={{uri:auth().currentUser.photoURL}} /> */}
        {currentUser && currentUser.photoURL ? (
                <Image
                    style={homeStyles.userImg}
                    source={{ uri: auth().currentUser.photoURL }}
                />
            ) : (
                <Image
                    style={homeStyles.userImg}
                    source={require('../../Assets/Images/user.jpg')}
                />
            )}
        </View>

        <View style={{alignItems:"center"}}>
        
        <AvailSpace />
       
        </View>
        <View style={{flexDirection:"row"}}>

        <CustomLabel handlePress={handlePress}/>
        </View >
        {/* <View
        style={{alignItems:"center"}}
        > */}
          <View style={homeStyles.buttonShadow}>
            <TouchableOpacity 
          onPress={handleAddNote}>
            <Text style={homeStyles.buttonText}>
              +
            </Text>
          </TouchableOpacity>
            </View>
            {/* </View> */}

        </SafeAreaView>
    )
}

export default Home;