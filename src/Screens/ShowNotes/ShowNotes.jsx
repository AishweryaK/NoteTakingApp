import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import HTML from  "react-native-render-html"
import { styles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';
import { dimensions } from '../../Constants/utility';
import CustomInput from '../../Components/CustomInput';
import { inputStyles } from '../../Common/styles';
import filter from "lodash.filter";


const NotesScreen = ({ route, navigation}) => {
  const [notes, setNotes] = useState([]);
  const [fullNotes, setFullNotes] =useState([]);
  const [searchQuery, setSearchQuery]= useState("");
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
        setFullNotes(notesData)
        console.log(notesData, "notesData");
      });

    return () => unsubscribe();
  }, [uid]);

  useEffect(() => {
    console.log(notes, "notes");
  }, [notes]);

  const handleSearch =(query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredNotes = filter(fullNotes, (note) => {
      return contains(note, formattedQuery);
    } );
    setNotes(filteredNotes);
  }

  const contains = ({title, desc}, query) => {
    if(title.toLowerCase()?.includes(query) || desc.toLowerCase()?.includes(query))
      {
        return true;
      }

      return false;
  }

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
      <View style={{ alignItems:"center"}}>

        <TextInput
        style={inputStyles.customInput}
        placeholder='Search'
        value={searchQuery}
        onChangeText={handleSearch} 
        clearButtonMode='always'
        autoCapitalize='none'
        autoCorrect={false}
        />
      </View>
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
