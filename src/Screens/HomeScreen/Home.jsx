import React ,{useState, useEffect} from "react";
import { Text, TouchableOpacity, View, Image, ImageBackground, ScrollView } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeStyles } from "./homeStyle";
import auth from '@react-native-firebase/auth';
import { dimensions } from "../../Constants/utility";
import AvailSpace from "./AvailSpace";
import CustomList from "../../Components/CustomList";

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

  useEffect( ()=>{
    console.log("HOME")
  },[])

    const handleAddNote =() =>{
      // console.log(currentUser.uid, "UIDd")
        navigation.navigate(NAVIGATION.ADDNOTE, {uid:currentUser.uid, itemTitle:"", itemDesc:""})
    }

    const handleUser = () => {
      const user = auth().currentUser;
      console.log(user, "THIS IS CURR USER")
    }

    // const handlePress = () => {
    //   navigation.navigate(NAVIGATION.NOTESCREEN,{uid:currentUser.uid})
    // }

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
            Welcome, {currentUser ? currentUser.displayName : ""} ! 
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
                    source={require('../../Assets/Images/userImg.jpeg')}
                />
            )}
        </View>

        <View style={{alignItems:"center"}}>
        
        <AvailSpace />
       
        </View>

        { currentUser ? 
        <View style={{flexDirection:"row", height: dimensions.height*0.50}}>

        {/* <CustomLabel handlePress={handlePress}
        text={"Personal"}
        number={1}
        /> */}
        
        <CustomList 
        userUid={currentUser.uid}
        navigation={navigation}
        // handlePress={handlePress}
        />
        
        </View > 
        :
        <View>
          <Text>
            Loading
          </Text>
        </View>
}
        {/* <View
        style={{alignItems:"center"}}
        > */}
          {/* <View style={homeStyles.buttonShadow}>
            <TouchableOpacity 
          onPress={handleAddNote}>
            <Text style={homeStyles.buttonText}>
              +
            </Text>
          </TouchableOpacity>
            </View> */}
            {/* </View> */}

        </SafeAreaView>
    )
}

export default Home;