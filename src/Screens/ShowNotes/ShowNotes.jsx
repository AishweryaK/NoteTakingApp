import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import HTML from  "react-native-render-html"
import { styles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';
import { dimensions } from '../../Constants/utility';
import { inputStyles } from '../../Common/styles';
import filter from "lodash.filter";
import { APPCOLOR } from '../../Assets/Colors/appColors';
import { FONT } from '../../Constants/fontConstants';
import { homeStyles } from '../HomeScreen/homeStyle';

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
        // console.log(notesData, "notesData");
        // console.log("Triggered")
      });

    return () => unsubscribe();
  }, [uid]);

  // useEffect(() => {
  //   console.log(notes, "notes");
  // }, [notes]);

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

  const handleAddNote = () => {
    navigation.navigate(NAVIGATION.ADDNOTE, {uid: uid , label:itemText})
  }

  const MemoizedHTML = React.memo(HTML);

  const renderItem = ({ item }) => (
    
    
    <View style={styles.container}>
      <TouchableOpacity style={{flex:1}}
      onPress={()=> navigation.navigate(NAVIGATION.ADDNOTE, {uid: uid ,itemTitle: item.title, 
        itemDesc : item.desc, itemID: item.id, label:itemText})}
      >
      <Text style={styles.txt}
      >{item.title}</Text>
      <MemoizedHTML 
      baseStyle={{fontFamily:FONT.BOLD,
            fontSize:14,
            lineHeight:18.2,
            opacity: 0.67,
            color:APPCOLOR.HEADERTITLE}}
            // defaultTextProps={styles.content}
      source={{ html: item.desc }} 
      contentWidth={dimensions.width} 
      />
      {/* <Text style={styles.content}
      >{item.desc}</Text> */}
      </TouchableOpacity>
    </View>
    
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.input}>

        <TextInput
        style={inputStyles.customInput}
        placeholder='Search'
        value={searchQuery}
        onChangeText={handleSearch} 
        clearButtonMode='always'
        autoCapitalize='none'
        autoCorrect={false}
        placeholderTextColor={APPCOLOR.PLACEHOLDER}
        />
      </View>
    <FlatList
    style={styles.list}
      data={notes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
    <View style={{alignItems:"center"}}>
    <View style={[homeStyles.buttonShadow, {borderRadius:1000, 
      width:dimensions.width*0.5, justifyContent:"flex-end",}]}>
            <TouchableOpacity style={styles.button}
          onPress={handleAddNote}
          >
            <Text style={[homeStyles.buttonText, {fontSize:30, paddingVertical:10}]}>
              +
            </Text>
            <Text style={[homeStyles.buttonText, {fontSize:14,paddingVertical:20}]}>
              Add New Notes
            </Text>
          </TouchableOpacity>
            </View>
            </View>
    </SafeAreaView>
  );
};

export default NotesScreen;
