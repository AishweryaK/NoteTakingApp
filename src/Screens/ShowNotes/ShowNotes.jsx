import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import HTML from  "react-native-render-html"
import { styles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';
import { dimensions } from '../../Constants/utility';


const NotesScreen = ({ route, navigation}) => {
  const [notes, setNotes] = useState([]);
  const {uid, itemText} = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(uid)
      .collection(itemText)
      .onSnapshot((snapshot) => {
        const notesData = [];
        snapshot.forEach((docSnapshot) => {
        notesData.push({
            ...docSnapshot.data(),
            id:docSnapshot.id
        })
        });
        setNotes(notesData);
        console.log(notesData, "notesData");
      });

    return () => unsubscribe();
  }, [uid]);

  // useEffect(() => {
  //   console.log(notes, "notes");
  // }, [notes]);

  const renderItem = ({ item }) => (
    
    <View style={styles.container}>
      <TouchableOpacity style={{flex:1}}
      onPress={()=> navigation.navigate(NAVIGATION.ADDNOTE, {uid: uid ,itemTitle: item.title, itemDesc : item.desc, itemID: item.id})}
      >
      <Text style={styles.txt}
      >{item.title}</Text>
      <HTML tagsStyles={{}} 
      source={{ html: item.desc }} 
      contentWidth={dimensions.width} />
      {/* <Text style={styles.txt}
      >{item.desc}</Text> */}
      </TouchableOpacity>
    </View>
    
  );

  return (
    <SafeAreaView style={styles.wrapper}>
    <FlatList
    style={styles.list}
      data={notes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
    </SafeAreaView>
  );
};

export default NotesScreen;
