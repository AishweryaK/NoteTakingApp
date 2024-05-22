import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView } from 'react-native';
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
import { useSelector } from 'react-redux';
import { getThemeColors } from '../../Assets/Colors/themeColors';

const NotesScreen = ({ route, navigation}) => {
  const [notes, setNotes] = useState([]);
  const [fullNotes, setFullNotes] =useState([]);
  const [searchQuery, setSearchQuery]= useState("");
  const {uid, itemText} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [itemUid, setItemUid] = useState(null)
  const theme = useSelector((state)=>state.user.theme)
  const colors= getThemeColors(theme);

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

  useEffect(() => {
    console.log(itemText, "label");
  }, [itemText]);

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

  const handleLongPress=(itemUid) => {
    setItemUid(itemUid);
    setModalVisible(true);
    console.log(itemUid, 2734784544)
  }

  const decLabelCollection = async () => {
    const collectionRef = firestore().collection('users').doc(uid);
    const doc = await collectionRef.get();
    if (doc.exists) {
      const userData = doc.data();
      // console.log(userData, "USERDATA")
      const updatedCollections = userData.collections.map(collection => {
        // console.log(collection, "COLLECTTT")
        if (collection.text === itemText) {
          return {
            ...collection,
            number: collection.number - 1,
          };
        }
        return collection;
      });
      await collectionRef.set(
        { collections: updatedCollections },
        { merge: true },
      );
    }
  };
  const deleteNote = async() => {
    await firestore()
        .collection('users')
        .doc(uid)
        .collection(itemText)
        .doc(itemUid)
        .delete();
  }


  const handleDeleteNote = async () => {
    try {
      deleteNote();
      setModalVisible(false);
      setItemUid(null)
  
      decLabelCollection();
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  }

  const MemoizedHTML = React.memo(HTML);

  const renderItem = ({ item }) => (
    
    
    <TouchableOpacity style={styles.container(colors)}
      onPress={()=> navigation.navigate(NAVIGATION.ADDNOTE, {uid: uid ,itemTitle: item.title, 
        itemDesc : item.desc, itemID: item.id, label:itemText})}
        onLongPress={()=>handleLongPress(item.id)}
      >
      <Text style={styles.txt(colors)}
      >{item.title}</Text>
      <MemoizedHTML 
      baseStyle={{fontFamily:FONT.BOLD,
            fontSize:14,
            lineHeight:18.2,
            opacity: 0.67,
            color:colors.HEADERTITLE}}
            // defaultTextProps={styles.content}
      source={{ html: item.desc }} 
      contentWidth={dimensions.width} 
      />
      {/* <Text style={styles.content}
      >{item.desc}</Text> */}
      {/* </TouchableOpacity> */}
    </TouchableOpacity>
    
  );

  return (
    // <SafeAreaView style={styles.wrapper(colors)}>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={styles.wrapper(colors)}
      keyboardVerticalOffset={97}
      >
      <View style={styles.input}>

        <TextInput
        style={inputStyles.customInput(colors)}
        placeholder='Search'
        value={searchQuery}
        onChangeText={handleSearch} 
        clearButtonMode='always'
        autoCapitalize='none'
        autoCorrect={false}
        placeholderTextColor={colors.PLACEHOLDER}
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
    <View style={[homeStyles.buttonShadow(colors), styles.bottomButton]}>
            <TouchableOpacity style={styles.button}
          onPress={handleAddNote}
          >
            <Text style={[homeStyles.buttonText(colors), {fontSize:30, paddingVertical:10}]}>
              +
            </Text>
            <Text style={[homeStyles.buttonText(colors), {fontSize:14,paddingVertical:20}]}>
              Add New Notes
            </Text>
          </TouchableOpacity>
            </View>
            </View>
        <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer(colors)}>
            <Text style={styles.modalTitle(colors)}>Delete Note</Text>
            <Text style={styles.modalMessage(colors)}>Are you sure you want to delete this note?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleDeleteNote}>
                <Text style={styles.modalText(colors)}>Yes</Text>
                </TouchableOpacity>
              <TouchableOpacity  onPress={() => setModalVisible(false)} >
              <Text style={styles.modalText(colors)}>No</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </KeyboardAvoidingView>
    // </SafeAreaView>
  );
};

export default NotesScreen;
