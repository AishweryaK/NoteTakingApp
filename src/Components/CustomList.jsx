import React, {useMemo, useState, useEffect} from "react";
import { View, TouchableOpacity, Text, ImageBackground, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import CustomLabel from "./CustomLabel";
import { NAVIGATION } from "../Constants/navConstants";
import { useSelector } from "react-redux";
import AvailSpace from "../Screens/HomeScreen/AvailSpace";
import { dimensions } from "../Constants/utility";


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

    // const decLabelCollection = async () => {
    //   const collectionRef = firestore().collection('users').doc(user.uid);
    //   const doc = await collectionRef.get();
    //   if (doc.exists) {
    //     const userData = doc.data();
    //     const updatedCollections = userData.collections.map(collection => {
    //       if (collection.text === itemText) {
    //         return {
    //           ...collection,
    //           number: collection.number - 1,
    //         };
    //       }
    //       return collection;
    //     });
    //     await collectionRef.set(
    //       { collections: updatedCollections },
    //       { merge: true },
    //     );
    //   }
    // };

    const renderItem = useMemo(() => {
        return ({ item }) => (
            <View style={{paddingBottom:30}}>
          <CustomLabel
          handleLongPress={()=>
            console.log("long")
          }
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
            nestedScrollEnabled= {true}
            ListHeaderComponent={<AvailSpace />}
            showsVerticalScrollIndicator= {false}
            contentContainerStyle={{paddingBottom:dimensions.height*0.078}}
        />

    );
}

export default React.memo(CustomList);
