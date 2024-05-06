import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { styles } from '../SignupScreen/styles';
import HTML from  "react-native-render-html"
import { dimensions } from '../../Constants/utility';
import { APPCOLOR } from '../../Assets/Colors/appColors';
import { FONT } from '../../Constants/fontConstants';

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
    <View style={{flex: 1,
        // alignItems: 'center',
        backgroundColor:APPCOLOR.BACKGROUND,
        // paddingTop:30, 
        // borderWidth:2,
        marginTop:10,
        marginHorizontal:8,
        borderRadius:20,
        // paddingVertical:20,
        padding:20,
        fontFamily:FONT.REGULAR,

        shadowColor: APPCOLOR.BLUE,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation:7,
    }}>
      <Text style={{
        fontFamily:FONT.EXTRA_BOLD,
        fontSize:16,
        lineHeight:22,
      }}
      >{item.title}</Text>
      <HTML style={{fontSize:5}} 
      source={{ html: item.desc }} contentWidth={dimensions.width} />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: APPCOLOR.BACKGROUND }}>
    <FlatList
    style={{paddingHorizontal:8}}
      data={notes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
    </SafeAreaView>
  );
};

export default NotesScreen;
