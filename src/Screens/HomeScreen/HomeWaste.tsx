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


//--------------------------------------------------------------------------------------------------------------------------------



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






//--------------------------------------------------------------------------------------------------------------------------------



  // useEffect(() => {
  //   setTimeout(() => {
  //     const unsubscribe = auth().onAuthStateChanged(user => {
  //       console.log("inside effect",user)
  //       if (user) {
  //         setCurrentUser(user);
  //         setDisplayName(user.displayName);
  //         setPhotoUrl(user.photoURL);
  //       } else {
  //         setCurrentUser(null);
  //       }
  //       setLoading(false);
  //     });
  //   }, 3000);

  //   // return () => unsubscribe();
  // }, []);

  // useEffect(() => {
    
  //     const unsubscribe = auth().onAuthStateChanged(user => {
  //       // console.log("inside effect",user)
  //       if (user) {
  //         setCurrentUser(user);
  //         setDisplayName(user.displayName);
  //         setPhotoUrl(user.photoURL);
  //       } else {
  //         setCurrentUser(null);
  //       }
  //       setLoading(false);
  //     });

  //   return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   if (currentUser) {
  //     setDisplayName(currentUser.displayName);
  //     setPhotoUrl(currentUser.photoURL);
  //   }
  //   // else {
  //   //   setDisplayName("");
  //   //   setPhotoUrl();
  //   // }
  // }, [currentUser]);

  // useEffect(()=> {
  //   console.log(currentUser, "CURRRRRRRRRRRRRRRRR")
  //   console.log(photoUrl)
  //   console.log(displayName)
  // },[currentUser, photoUrl, displayName])