import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Modal, KeyboardAvoidingView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import HTML from "react-native-render-html";
import { showStyles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';
import { dimensions } from '../../Constants/utility';
import { inputStyles } from '../../Common/styles';
import filter from "lodash.filter";
import { APPCOLOR } from '../../Assets/Colors/appColors';
import { FONT } from '../../Constants/fontConstants';
import { homeStyles } from '../HomeScreen/homeStyle';
import { useSelector } from 'react-redux';
import { getThemeColors } from '../../Assets/Colors/themeColors';
import StaggerView from '@mindinventory/react-native-stagger-view';

const NotesScreen = ({ route, navigation }) => {
  const [notes, setNotes] = useState([]);
  const [fullNotes, setFullNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { uid, itemText } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [itemUid, setItemUid] = useState(null)
  const theme = useSelector((state) => state.user.theme)
  const colors = getThemeColors(theme);

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
            id: docSnapshot.id
          });
        });
        setNotes(notesData);
        setFullNotes(notesData)
      });

    return () => unsubscribe();
  }, [uid]);

  useEffect(() => {
    console.log(itemText, "label");
  }, [itemText]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredNotes = filter(fullNotes, (note) => {
      return contains(note, formattedQuery);
    });
    setNotes(filteredNotes);
  }

  const contains = ({ title, desc }, query) => {
    if (title.toLowerCase()?.includes(query) || desc.toLowerCase()?.includes(query)) {
      return true;
    }

    return false;
  }

  const handleAddNote = () => {
    navigation.navigate(NAVIGATION.ADDNOTE, { uid: uid, label: itemText })
  }

  const handleLongPress = (itemUid) => {
    setItemUid(itemUid);
    setModalVisible(true);
    console.log(itemUid, 2734784544)
  }

  const decLabelCollection = async () => {
    const collectionRef = firestore().collection('users').doc(uid);
    const doc = await collectionRef.get();
    if (doc.exists) {
      const userData = doc.data();
      const updatedCollections = userData.collections.map(collection => {
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
  const deleteNote = async () => {
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
    <TouchableOpacity style={showStyles.container(colors)}
      onPress={() => navigation.navigate(NAVIGATION.ADDNOTE, {
        uid: uid, itemTitle: item.title,
        itemDesc: item.desc, itemID: item.id, label: itemText
      })}
      onLongPress={() => handleLongPress(item.id)}
    >
      {item.title &&
        <Text style={showStyles.txt(colors)}
        >{item.title}</Text>
      }
      {/* <View style={showStyles.ellipsisContainer}> */}
        <MemoizedHTML
          baseStyle={{
            fontFamily: FONT.BOLD,
            fontSize: 14,
            lineHeight: 18.2,
            opacity: 0.67,
            color: colors.HEADERTITLE,
            maxHeight:100,
            overflow:"hidden",
            // backgroundColor:"red"
          }}
          source={{ html: item.desc }}
          contentWidth={dimensions.width}
        />
      {/* </View> */}
    </TouchableOpacity>

  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={showStyles.wrapper(colors)}
      keyboardVerticalOffset={97}
    >
      <View style={showStyles.input}>

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
      <StaggerView
        style={showStyles.list}
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        
      />
      <View style={{ alignItems: "center" }}>
        <View style={[homeStyles.buttonShadow(colors), showStyles.bottomButton]}>
          <TouchableOpacity style={showStyles.button}
            onPress={handleAddNote}
          >
            <Text style={[homeStyles.buttonText(colors), {fontSize:30, paddingVertical: 10}]}>
              +
            </Text>
            <Text style={[homeStyles.buttonText(colors), { fontSize: 14,paddingVertical:20 }]}>
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
        <View style={showStyles.modalBackground}>
          <View style={showStyles.modalContainer(colors)}>
            <Text style={showStyles.modalTitle(colors)}>Delete Note</Text>
            <Text style={showStyles.modalMessage(colors)}>Are you sure you want to delete this note?</Text>
            <View style={showStyles.modalButtons}>
              <TouchableOpacity onPress={handleDeleteNote}>
                <Text style={showStyles.modalText(colors)}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} >
                <Text style={showStyles.modalText(colors)}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default NotesScreen;

