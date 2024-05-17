import React, {useMemo, useState, useEffect} from "react";
import { View, TouchableOpacity, Text, ImageBackground, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import CustomLabel from "./CustomLabel";
import { NAVIGATION } from "../Constants/navConstants";
import { useSelector } from "react-redux";


function CustomList({navigation}) {
  const [collections, setCollections] = useState([]);
  const user = useSelector((state) => state.user);
    

    useEffect(() => {
      const userDocRef = firestore().collection('users').doc(user.uid);
  
      const unsubscribe = userDocRef.onSnapshot((snapshot) => {
        // console.log('snapshot',snapshot)
        if (snapshot.exists) {
          const userData = snapshot.data();
          console.log("userData fetching", userData)
          if (userData.collections) {
            setCollections(userData.collections);
          }
        }
      });

      return () => unsubscribe();
    }, [user.uid]);

    const renderItem = useMemo(() => {
        return ({ item }) => (
            <View style={{marginBottom:30}}>
          <CustomLabel
            handlePress={() =>
              navigation.navigate(NAVIGATION.NOTESCREEN, { uid: user.uid, itemText: item.text })
            }
            text={item.text}
            number={item.number}
          />
          </View>
        );
      }, [navigation, user.uid]);


    return (
        <FlatList
            data={collections}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
        />
    );
}

export default CustomList;



// const renderItem = ({ item }) => (
    //     <View style={{marginBottom:30}}>
    //     <CustomLabel handlePress={() => navigation.navigate(NAVIGATION.NOTESCREEN, {uid:user.uid, itemText :item.text})} text={item.text} number={item.number} />
    //     </View>
    // );



// function CustomLabel ({handlePress, text, number}) {

//     return (
//         <TouchableOpacity
//         onPress={handlePress}
//         style={labelStyles.container}
//         >
//         {/* <View style={labelStyles.container}> */}
//         <ImageBackground source={require("../Assets/Images/LabelImg.png")} 
//         style={labelStyles.bg}
//         />
//         <View style={labelStyles.icon}>
//                     <FrameIcon />
//                 </View>
//                 <View style={labelStyles.txtView}>
//                 <Text style={labelStyles.title}>
//                     {text}
//                 </Text>
//                 <Text style={labelStyles.txt}>
//                    {number} Files
//                 </Text>
//                 </View>
//         {/* </View> */}
//         </TouchableOpacity>
//     )
// }

