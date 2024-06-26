import React, {useRef, useState, useEffect, useFocusEffect} from 'react';
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
  StatusBar,
} from 'react-native';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import {APPCOLOR} from '../../Assets/Colors/appColors';
import {homeStyles} from '../HomeScreen/homeStyle';
import {FONT} from '../../Constants/fontConstants';
import {NAVIGATION} from '../../Constants/navConstants';
import firestore , { serverTimestamp } from '@react-native-firebase/firestore';
import {styles} from './styles';
import {profileImgStyles} from '../../Common/styles';
import {dimensions} from '../../Constants/utility';
import {useSelector} from 'react-redux';
import {getThemeColors, themeColors} from '../../Assets/Colors/themeColors';
import {ICONS} from '../../Constants/iconConstants';
import Reminder from './Reminder';
import CustomDialogInput from './CustomDialogInput';

function AddNote({route, navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [collections, setCollections] = useState([]);
  const [newCollection, setNewCollection] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState({
    number: 1,
    text: 'Others',
  });
  const richText = useRef();
  const [emptyColl, setEmptyColl] = useState(false);
  const theme = useSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  // const descRef = useRef("");

  const {uid, itemTitle, itemDesc, itemID, label} = route.params;
// console.log(emptyColl,"EMPTY")
  useEffect(() => {
    if (itemTitle || itemDesc) {
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

  const handleInsertLink = () => {
    setIsDialogVisible(true);
  };
  const handleCancel = () => {
    setIsDialogVisible(false);
  };

  const handleSubmit = (link) => {
    if(link=="")
      {
        Alert.alert("No URL provided", "Please enter a URL");
        return;
      }
    richText.current?.insertLink(link, link);
    setIsDialogVisible(false);
  };

  const handleDesc = text => {
    setDesc(text);
  };

  const updateNote = async () => {
    await firestore()
      .collection('users')
      .doc(uid)
      .collection(label)
      .doc(itemID)
      .update({
        title: title,
        desc: desc,
        createdAt : serverTimestamp(),
      });
  };

  const saveNoteLabel = async () => {
    await firestore().collection('users').doc(uid).collection(label).add({
      title: title,
      desc: desc,
      createdAt : serverTimestamp(),
    });
  };

  const incLabelCollection = async () => {
    const collectionRef = firestore().collection('users').doc(uid);
    const doc = await collectionRef.get();
    if (doc.exists) {
      const userData = doc.data();
      const updatedCollections = userData.collections.map(collection => {
        if (collection.text === label) {
          return {
            ...collection,
            number: collection.number + 1,
          };
        }
        return collection;
      });
      await collectionRef.set({collections: updatedCollections}, {merge: true});
    }
  };

  const saveNoteNew = async () => {
    await firestore()
      .collection('users')
      .doc(uid)
      .collection(selectedCollection.text)
      .add({
        title: title,
        desc: desc, 
        createdAt : serverTimestamp(),
      });
  };

  const incNewCollection = async () => {
    const collectionRef = firestore().collection('users').doc(uid);
    const doc = await collectionRef.get();
    if (doc.exists) {
      const userData = doc.data();
      const updatedCollections = userData.collections.map(collection => {
        if (collection.text === selectedCollection.text) {
          return {
            ...collection,
            number: collection.number + 1,
          };
        }
        return collection;
      });
      await collectionRef.set({collections: updatedCollections}, {merge: true});
    }
  };

  const saveNote = async () => {
    if (title === '' && desc === '') {
      Alert.alert('Empty note', 'It will be discarded');
      navigation.goBack();
      return;
    }
    try {
      if (itemID && label) {
        updateNote();
      } else if (label) {
        saveNoteLabel();

        incLabelCollection();
      } else {
        saveNoteNew();
        incNewCollection();
      }

      setTitle('');

      setDesc('');

      console.log(' Note saved successfully!');
      if (itemID || label) {
        navigation.goBack();
      } else {
        navigation.navigate(NAVIGATION.HOMESCREEN);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const setCollection = async () => {
    const updatedCollections = [
      ...collections,
      {text: newCollection.trim(), number: 0},
    ];
    await firestore().collection('users').doc(uid).set(
      {
        collections: updatedCollections,
      },
      {merge: true},
    );
    setCollections(updatedCollections);
  };

  const addCollection = async () => {
    if (newCollection.trim() === '') {
      setEmptyColl(true);
      return;
    }

    setEmptyColl(false);

    const trimmedNewCollection = newCollection.trim();
    const existingCollection = collections.find(
      collection =>
        collection.text.toLowerCase() === trimmedNewCollection.toLowerCase(),
    );

    if (existingCollection) {
      setSelectedCollection(existingCollection);
    } else {
      try {
        setCollection();
        setSelectedCollection({text: trimmedNewCollection, number: 1});
      } catch (error) {
        console.error('Error adding collection:', error);
      }
    }

    setModalVisible(false);
    setNewCollection('');
  };

  const renderCollectionItem = ({item}) => (
    <TouchableOpacity
      style={styles.collectionItem}
      onPress={() => handleCollectionSelection(item)}>
      <Text style={styles.collectionText(colors)}>{item.text}</Text>
    </TouchableOpacity>
  );
  const handleCollectionSelection = collection => {
    setSelectedCollection(collection);
    setModalVisible(false);
    setEmptyColl(false);
  };

  return (
    // <SafeAreaView style={styles.container(colors)}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={styles.container(colors)}
      keyboardVerticalOffset={97}>
        {/* {modalVisible &&
          <StatusBar backgroundColor={"rgba(0,0,0,0)"}
      barStyle= {theme === "LIGHT" ? "dark-content" : "light-content"}
      />} */}
      <View style={styles.view}>
        {/* <Reminder /> */}
        <View></View>
        <View>
          {itemID || label ? null : (
            <TouchableOpacity
              style={styles.collButton(colors)}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.collText(colors)}>
                {' '}
                {selectedCollection.text}{' '}
              </Text>
            </TouchableOpacity>
          )}

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : ''}
              style={profileImgStyles.modalBackground}
              // keyboardVerticalOffset={-10}
            >
              <View
                style={[
                  profileImgStyles.modalContainer(colors),
                  {
                    height: dimensions.height * 0.4,
                    width: dimensions.width * 0.55,
                  },
                ]}>
                <View style={styles.closeButtonView}>
                  <View style={styles.inner}>
                    <Text style={styles.heading(colors)}>Collections</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.xButton(colors)}
                    onPress={() => {setModalVisible(false);
                      setEmptyColl(false);
                    }}>
                    <Text style={{color: colors.HEADERTITLE}}>X</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={collections}
                  renderItem={renderCollectionItem}
                  keyExtractor={(item, index) => index.toString()}
                />

                <TextInput
                  style={styles.newCollectionInput(colors)}
                  placeholder="Add Collection"
                  value={newCollection}
                  onChangeText={setNewCollection}
                  placeholderTextColor={colors.HEADERTITLE}
                  maxLength={20}
                  onBlur={()=> setEmptyColl(false)}
                />
                {emptyColl && newCollection=="" && (
                  <Text style={{color: 'red', paddingBottom: 10}}>
                    *Enter collection name
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.addButton(colors)}
                  onPress={addCollection}>
                  <Text style={styles.addTxt(colors)}>Add</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      </View>

      <TextInput
        value={title}
        style={styles.title(colors)}
        placeholder="Title"
        multiline={true}
        maxLength={60}
        onChangeText={text => setTitle(text)}
        placeholderTextColor={'gray'}
      />

      <RichEditor
        ref={richText}
        placeholder="Note"
        initialContentHTML={desc}
        onChange={handleDesc}
        androidHardwareAccelerationDisabled={true}
        initialHeight={80}
        scrollEnabled={true}
        onLink={async url => {
          try {
            const result = await Linking.openURL(url);
          } catch (error) {
            console.error('Error occurred while opening URL:', error);
          }
        }}
        editorStyle={styles.editor(colors)}
        style={styles.desc(colors)}
        // containerStyle={{ overflow: 'scroll' }}
      />

      <View style={{alignItems: 'center'}}>
        <View style={homeStyles.buttonShadow(colors)}>
          <TouchableOpacity onPress={saveNote}>
            <Text style={styles.buttonTxt(colors)}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{justifyContent: 'flex-end'}}>
        <RichToolbar
          style={styles.toolbar(colors)}
          editor={richText}
          iconTint={themeColors.LIGHT.GRAY}
          selectedIconTint={themeColors.LIGHT.DARK_BLUE}
          // onInsertLink={()=>console.log("hello")}
          // onInsertLink={()=>{Alert.alert('')}}
          onInsertLink={handleInsertLink}
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
        <CustomDialogInput
        isVisible={isDialogVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
      </View>
    </KeyboardAvoidingView>
  );
}

export default AddNote;
