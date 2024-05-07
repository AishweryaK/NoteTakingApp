import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import { styles } from '../SignupScreen/styles';
import HTML from  "react-native-render-html"
import { dimensions } from '../../Constants/utility';
import { APPCOLOR } from '../../Assets/Colors/appColors';
import { FONT } from '../../Constants/fontConstants';
import { styles } from './styles';


const NotesScreen = ({ route}) => {
  const [notes, setNotes] = useState([]);
  const {uid} = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .doc(uid)
      .collection('notes')
      .onSnapshot((snapshot) => {
        const notesData = [];
        snapshot.forEach((docSnapshot) => {
        //   const note = docSnapshot.data();
        //   note.id = docSnapshot.uid; 
        //   notesData.push(note);
        notesData.push({
            ...docSnapshot.data(),
            id:docSnapshot.id
        })
        });
        setNotes(notesData);
        console.log(notes);
      });

    return () => unsubscribe();
  }, [uid]);

  const renderItem = ({ item }) => (
    
    <View style={styles.container}>
      <TouchableOpacity style={{flex:1}}>
      <Text style={styles.txt}
      >{item.title}</Text>
      {/* <HTML tagsStyles={{}} 
      source={{ html: item.desc }} 
      contentWidth={dimensions.width} /> */}
      <Text style={styles.txt}
      >{item.desc}</Text>
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
