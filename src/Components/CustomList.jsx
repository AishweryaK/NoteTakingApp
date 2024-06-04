import React, { useMemo, useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ImageBackground, FlatList, Modal, Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";
import CustomLabel from "./CustomLabel";
import { NAVIGATION } from "../Constants/navConstants";
import { useSelector } from "react-redux";
import AvailSpace from "../Screens/HomeScreen/AvailSpace";
import { dimensions } from "../Constants/utility";
import { showStyles } from "../Screens/ShowNotes/styles";
import { getThemeColors } from "../Assets/Colors/themeColors";


function CustomList({ navigation }) {
  const [collections, setCollections] = useState([]);
  const user = useSelector((state) => state.user);
  const colors = getThemeColors(user.theme);
  const [modalVisible, setModalVisible] = useState(false);
  const [collName, setCollName] = useState("");


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

  const handleLongPress = (collName) => {
    setCollName(collName);
    setModalVisible(true);
  }

  const removeCollectionFromFirestore = async (collName) => {
    const collectionItem = collections.find(collection => collection.text === collName);
    const number = collectionItem ? collectionItem.number : 1;
    const userDocRef = firestore().collection('users').doc(user.uid);

    await userDocRef.update({
      collections: firestore.FieldValue.arrayRemove({
        text: collName,
        number: number
      })
    });
  }

  const handleDeleteCollection = async () => {
    if (collName == "Personal" || collName == "Academic" || collName == "Others" || collName == "Work") {
      Alert.alert("Action Not Allowed", "You cannot delete default collections.");
      setModalVisible(false)
      return;
    }
    try {

      const collectionRef = firestore()
        .collection('users')
        .doc(user.uid)
        .collection(collName);

      const snapshot = await collectionRef.get();

      const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);

      removeCollectionFromFirestore(collName);



      setCollections(prevCollections =>
        prevCollections.filter(collection => collection.text !== collName)
      );

      setModalVisible(false);
    } catch (error) {
      console.error("Error deleting collection: ", error);
    }
  }

  const renderItem = useMemo(() => {
    return ({ item }) => (
      <View style={{ paddingBottom: 30 }}>
        <CustomLabel
          handleLongPress={() =>
            handleLongPress(item.text)
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
    <>
      <FlatList

        data={collections}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        nestedScrollEnabled={true}
        ListHeaderComponent={<AvailSpace />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: dimensions.height * 0.078 }}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={showStyles.modalBackground}>
          <View style={showStyles.modalContainer(colors)}>
            <Text style={showStyles.modalTitle(colors)}>Delete Collection</Text>
            <Text style={showStyles.modalMessage(colors)}>Are you sure you want to delete the {collName} collection?</Text>
            <View style={showStyles.modalButtons}>
              <TouchableOpacity onPress={handleDeleteCollection}>
                <Text style={showStyles.modalText(colors)}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} >
                <Text style={showStyles.modalText(colors)}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default React.memo(CustomList);
