import React, { useRef, useState, useEffect, useFocusEffect } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Text,
  TextInput,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { APPCOLOR } from '../../Assets/Colors/appColors';
import { homeStyles } from '../HomeScreen/homeStyle';
import { FONT } from '../../Constants/fontConstants';
import { NAVIGATION } from '../../Constants/navConstants';
import firestore from '@react-native-firebase/firestore';
import { styles } from './styles';
import { profileImgStyles } from '../../Common/styles';
import { dimensions } from '../../Constants/utility';


function AddNote({ route, navigation }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState('');
  const [selectedCollection, setSelectedCollection] = useState({
    number: 1,
    text: 'Others',
  });
  const richText = useRef();
  // const descRef = useRef("");

  const { uid, itemTitle, itemDesc, itemID, label } = route.params;

  useEffect(() => {
    if (itemTitle && itemDesc) {
      setTitle(itemTitle);
      setDesc(itemDesc);
    }
  }, [itemTitle, itemDesc]);

  useEffect(() => {
    const userDocRef = firestore().collection('users').doc(uid);

    const unsubscribe = userDocRef.onSnapshot(snapshot => {
      if (snapshot.exists) {
        const userData = snapshot.data();
        if (userData.collections) {
          setCollections(userData.collections);
        }
      }
    });

    return () => unsubscribe();
  }, [uid]);

  // useEffect(()=>{

  //   return saveNote
  // },[])

  // useEffect(() => {
  //     return () => {
  //         saveNote();
  //     };
  // }, []);

  // console.log(label, "THIS IS LABEL")

  //     useEffect(() => {
  //     console.log(title, "title");
  //     console.log(desc,"desc")
  //   }, [title, desc]);

  //   useEffect(() => {
  //     // console.log(selectedCollection, "SELECTEDDDD");
  //     // console.log(desc,"desc")
  //   }, [selectedCollection]);

  // console.log(uid, "UID")

  // console.log(desc, "THIS IS DESC")
  // console.log(scrollText.current)

  // const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>

  const handleDesc = text => {
    setDesc(text);
    //  descRef.current= desc;
  };
  // console.log(itemID,"ITEMID")
  // console.log(itemTitle,"TITLe")
  // console.log(itemDesc,"DESC")
  // console.log(label,"label")


  const saveNoteInDB= async()=>{
    await firestore().collection('users').doc(uid).collection(label).add({
      title: title,
      desc: desc,
    });
  }


  const saveNote = async () => {
    if (title === '' && desc === '') {
      Alert.alert('Empty note', 'It will be discarded');
      navigation.goBack();
      return;
    }
    try {
      if (itemID && label) {
        // console.log("inside itemid")
        await firestore()
          .collection('users')
          .doc(uid)
          .collection(label)
          .doc(itemID)
          .update({
            title: title,
            desc: desc,
          });
          console.log('update the previous note')
        // navigation.navigate(NAVIGATION.NOTESCREEN);
      } else if (label) {
        // console.log("inside itemid")
        saveNoteInDB()
        // navigation.navigate(NAVIGATION.NOTESCREEN);
        console.log('new note in label')

        const collectionRef = firestore().collection('users').doc(uid);
        const doc = await collectionRef.get();
        console.log("will i get the doc")
        if (doc.exists) {
          const userData = doc.data();
          // console.log(userData, "USERDATA")
          const updatedCollections = userData.collections.map(collection => {
            // console.log(collection, "COLLECTTT")
            if (collection.text === label) {
              return {
                ...collection,
                number: collection.number + 1,
              };
            }
            return collection;
          });
          await collectionRef.set(
            { collections: updatedCollections },
            { merge: true },
          );
          console.log("inc end")
        }
      } else {
        //         if( selectedCollection==null )
        //      {
        //         await firestore()
        //     .collection('users')
        //     .doc(uid)
        //     .collection('Others')
        //     .add({
        //       title: title,
        //       desc: desc,
        //     });
        // }

        await firestore()
          .collection('users')
          .doc(uid)
          .collection(selectedCollection.text)
          .add({
            title: title,
            desc: desc,
          });

        const collectionRef = firestore().collection('users').doc(uid);
        const doc = await collectionRef.get();
        if (doc.exists) {
          const userData = doc.data();
          // console.log(userData, "USERDATA")
          const updatedCollections = userData.collections.map(collection => {
            // console.log(collection, "COLLECTTT")
            if (collection.text === selectedCollection.text) {
              return {
                ...collection,
                number: collection.number + 1,
              };
            }
            return collection;
          });
          await collectionRef.set(
            { collections: updatedCollections },
            { merge: true },
          );
        }
      }
      console.log('update the previous note1111')
      setTitle('');
      console.log('update the previous note2222')
      setDesc('');

      console.log('update the previous note Note saved successfully!');
      if (itemID || label) {
        navigation.goBack();
      } else {
        navigation.navigate(NAVIGATION.HOMESCREEN)
      };
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const addCollection = async () => {
    if (newCollection.trim() === '') return;
    try {
      const updatedCollections = [
        ...collections,
        { text: newCollection, number: 0 },
      ];
      await firestore().collection('users').doc(uid).set(
        {
          collections: updatedCollections,
        },
        { merge: true },
      );

      setSelectedCollection({ text: newCollection, number: 1 });

      setModalVisible(false);
      setNewCollection('');
    } catch (error) {
      console.error('Error adding collection:', error);
    }
  };

  const renderCollectionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.collectionItem}
      onPress={() => handleCollectionSelection(item)}>
      <Text style={styles.collectionText}>{item.text}</Text>
    </TouchableOpacity>
  );
  const handleCollectionSelection = collection => {
    setSelectedCollection(collection);
    // console.log(selectedCollection.text, "TEXT")
    setModalVisible(false);
  };

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "red" }}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={97}>
      <View style={styles.view}>
        <View></View>
        <View>
          {itemID || label ? null : (
            <TouchableOpacity
              style={styles.collButton}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.collText}> {selectedCollection.text} </Text>
            </TouchableOpacity>
          )}

          <Modal
            // style={{backgroundColor:"red", margin:200}}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // setModalVisible(!modalVisible);
              setModalVisible(false);
            }}>
            {/* <SafeAreaView 
        style={profileImgStyles.modalBackground}
        > */}
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={profileImgStyles.modalBackground}
              keyboardVerticalOffset={0}>
              <View
                style={[
                  profileImgStyles.modalContainer,
                  {
                    height: dimensions.height * 0.4,
                    width: dimensions.width * 0.55,
                  },
                ]}>
                <View style={styles.closeButtonView}>
                  <View style={styles.inner}>
                    <Text style={styles.heading}>Collections</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.xButton}
                    onPress={() => setModalVisible(false)}>
                    <Text>X</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={collections}
                  renderItem={renderCollectionItem}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TextInput
                  style={styles.newCollectionInput}
                  placeholder="Add New Collection"
                  value={newCollection}
                  onChangeText={setNewCollection}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={addCollection}>
                  <Text style={styles.addTxt}>Add</Text>
                </TouchableOpacity>
              </View>
              {/* </SafeAreaView> */}
            </KeyboardAvoidingView>
          </Modal>
        </View>
      </View>
      {/* <View style={{backgroundColor:"blue", marginTop:10, flexDirection:"row",
                    justifyContent:"space-between"
                }}>
                    <View></View>
                    <Text>
                        Hello
                    </Text>

                </View> */}
      <TextInput
        value={title}
        style={styles.title}
        placeholder="Title"
        multiline={true}
        maxLength={60}
        onChangeText={text => setTitle(text)}
        placeholderTextColor={APPCOLOR.HEADERTITLE}
      />

      <RichEditor
        ref={richText}
        placeholder="Note"
        initialContentHTML={desc}
        onChange={handleDesc}
        androidHardwareAccelerationDisabled={true}
        initialHeight={80}
        scrollEnabled
        onLink={async url => {
          try {
            const result = await Linking.openURL(url);
            // console.log(result);
          } catch (error) {
            console.error('Error occurred while opening URL:', error);
          }
        }}
        editorStyle={styles.editor}
        style={styles.desc}
        containerStyle={{ overflow: 'scroll' }}
      />

      <View style={{ alignItems: 'center' }}>
        <View style={homeStyles.buttonShadow}>
          <TouchableOpacity onPress={saveNote}>
            <Text style={styles.buttonTxt}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View 
            style={{}}
            > */}
      <RichToolbar
        style={styles.toolbar}
        editor={richText}
        iconTint={APPCOLOR.GRAY}
        selectedIconTint={APPCOLOR.DARK_BLUE}
        actions={[
          // actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.setStrikethrough,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.checkboxList,
        ]}
      />
      {/* </View> */}
    </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}

export default AddNote;
