// import React ,{useState, useEffect} from "react";
// import { Text, TouchableOpacity, View, Image, ImageBackground, ScrollView } from "react-native";
// import { NAVIGATION } from "../../Constants/navConstants";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { homeStyles } from "./homeStyle";
// import auth from '@react-native-firebase/auth';
// import { dimensions } from "../../Constants/utility";
// import AvailSpace from "./AvailSpace";
// import CustomList from "../../Components/CustomList";

// function Home({navigation}) {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//       const unsubscribe = auth().onAuthStateChanged(user => {
//           if (user) {
//               setCurrentUser(user);
//           } else {
//               setCurrentUser(null);
//           }
//           setLoading(false);
//       });

//       return () => unsubscribe();
//   }, []);

//   useEffect( ()=>{
//     console.log("HOME")
//   },[])

//     const handleAddNote =() =>{
//       // console.log(currentUser.uid, "UIDd")
//         navigation.navigate(NAVIGATION.ADDNOTE, {uid:currentUser.uid, itemTitle:"", itemDesc:""})
//     }

//     const handleUser = () => {
//       const user = auth().currentUser;
//       console.log(user, "THIS IS CURR USER")
//     }

//     return (
      
//         <SafeAreaView 
//         style={homeStyles.safeArea}
//         >

       
//           <View style={homeStyles.outer}>
//           <View style={homeStyles.inner}>
//           <Text 
//           style={homeStyles.welcome}>
//             Welcome, {currentUser ? currentUser.displayName : ""} ! 
//             {/* {auth().currentUser.displayName} !  */}
//             </Text>
//             <Text
//             style={homeStyles.title}>
//               Notes App
//             </Text>
//         </View>
//         {/* <Image 
//         style={homeStyles.userImg}
//         source={{uri:auth().currentUser.photoURL}} /> */}
//         {currentUser && currentUser.photoURL ? (
//                 <Image
//                     style={homeStyles.userImg}
//                     source={{ uri: auth().currentUser.photoURL }}
//                 />
//             ) : (
//                 <Image
//                     style={homeStyles.userImg}
//                     source={require('../../Assets/Images/userImg.jpeg')}
//                 />
//             )}
//         </View>

//         <View style={{alignItems:"center"}}>
        
//         <AvailSpace />
       
//         </View>

//         { currentUser ? 
          
//         <View style={{flexDirection:"row", height: dimensions.height*0.50}}>

//         {/* <CustomLabel handlePress={handlePress}
//         text={"Personal"}
//         number={1}
//         /> */}
        
//         <CustomList 
//         userUid={currentUser.uid}
//         navigation={navigation}
//         // handlePress={handlePress}
//         />
        
//         </View > 
//         :
//         <View>
//           <Text>
//             Loading
//           </Text>
//         </View>
// }


       

//         </SafeAreaView>
//     )
// }

// export default Home;


import React, { useState, useEffect } from "react";
import { Text, View, Image, SafeAreaView, ActivityIndicator } from "react-native";
import { NAVIGATION } from "../../Constants/navConstants";
import { homeStyles } from "./homeStyle";
import auth from '@react-native-firebase/auth';
import { dimensions } from "../../Constants/utility";
import AvailSpace from "./AvailSpace";
import CustomList from "../../Components/CustomList";
import { APPCOLOR } from "../../Assets/Colors/appColors";

function Home({ navigation }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      // console.log("inside effect")
      if (user) {
        setCurrentUser(user);
        setDisplayName(user.displayName);
        setPhotoUrl(user.photoURL);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName);
      setPhotoUrl(currentUser.photoURL);
    }
    // else {
    //   setDisplayName("");
    //   setPhotoUrl();
    // }
  }, [currentUser]);

  useEffect(()=> {
    console.log(currentUser, "CURRRRRRRRRRRRRRRRR")
    console.log(photoUrl)
    console.log(displayName)
  },[currentUser, photoUrl, displayName])

  return (
    <SafeAreaView style={homeStyles.safeArea}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" color={APPCOLOR.BLUE} />
        </View>
      ) : (
        <View style={homeStyles.outer}>
          <View style={homeStyles.inner}>
            <Text style={homeStyles.welcome}>
              {/* Welcome, {currentUser ? displayName : ""} !  */}
              Welcome, {displayName} ! 
            </Text>
            <Text style={homeStyles.title}>Notes App</Text>
          </View>
          {/* {currentUser && currentUser.photoURL ? ( */}
            {photoUrl ? (
            
            <Image
              style={homeStyles.userImg}
              source={{ uri: photoUrl }}
            />
          ) : (
            <Image
              style={homeStyles.userImg}
              source={require('../../Assets/Images/userImg.jpeg')}
            />
          )}
        </View>
      )}

      <View style={{ alignItems: "center" }}>
        <AvailSpace />
      </View>

      {currentUser ? (
        <View style={{ flexDirection: "row", height: dimensions.height * 0.50 }}>
          <CustomList userUid={currentUser.uid} navigation={navigation} />
        </View>
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default Home;
