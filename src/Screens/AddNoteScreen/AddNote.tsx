import React, {useRef, useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  FlatList,
  Linking,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView
} from 'react-native';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import Modal from "react-native-modal";
import {NAVIGATION} from '../../Constants/navConstants';
import firestore from '@react-native-firebase/firestore';
import {styles} from './styles';
import {profileImgStyles} from '../../Components/ProfileImage/styles';
import {dimensions} from '../../Constants/utility';
import {useReduxSelector} from '../../Redux/Store/store';
import {commonColors, getThemeColors, themeColors} from '../../Assets/Colors/themeColors';
import CustomDialogInput from './CustomDialogInput';
import {AddNoteScreenProps} from '../../Navigation/routeTypes';
import { ADDNOTE, COLLECTION, CONSTANTS, ERR_CONSOLE, ERR_MSG, ERR_TITLE } from '../../Constants/strings';
import { showAlert } from '../../Common/alert';
import {saveNoteLabel, saveNoteNew, subscribeToUserCollections, updateCollectionCount, updateNote } from '../../Common/firebaseUtils';
const AddNote: React.FC<AddNoteScreenProps> = ({route, navigation}) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [collections, setCollections] = useState<
    Array<{text: string; number: number}>
  >([]);
  const [newCollection, setNewCollection] = useState<string>('');
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [selectedCollection, setSelectedCollection] = useState<{
    number: number;
    text: string;
  }>({
    number: 1,
    text: COLLECTION.OTHERS,
  });
  const [emptyColl, setEmptyColl] = useState<boolean>(false);
  const richText = useRef<RichEditor>(null);
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  const {uid, itemTitle, itemDesc, itemID, label} = route.params;

  useEffect(() => {
    if (itemTitle || itemDesc) {
      setTitle(itemTitle as string);
      setDesc(itemDesc as string);
    }
  }, [itemTitle, itemDesc]);

  // useEffect(() => {
  //   const unsubscribe = subscribeToUserCollections(uid, setCollections);

  //   return () => unsubscribe();
  // }, [uid]);

    useEffect(() => {
    const userDocRef = firestore().collection(COLLECTION.USERS).doc(uid);

    const unsubscribe = userDocRef.onSnapshot(snapshot => {
      if (snapshot.exists) {
        const userData = snapshot.data();
        if (userData?.collections) {
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

  const handleSubmit = (link: string) => {
    if (link === '') {
      Alert.alert(ERR_TITLE.NO_URL, ERR_MSG.ENTER_URL);
      return;
    }
    richText.current?.insertLink(link, link);
    setIsDialogVisible(false);
  };

  const handleDesc = (text: string) => {
    setDesc(text);
  };

  const saveNote = async () => {
    setIsSaving(true);
    if (title === '' && desc === '') {
      showAlert(ERR_TITLE.EMPTY_NOTE, ERR_MSG.NOTE_DISCARDED);
      navigation.goBack();
      return;
    }
    try {
      if (itemID && label) {
        updateNote(uid, label, itemID, title, desc);
      } else if (label) {
        saveNoteLabel(uid, label, title, desc);
        updateCollectionCount(uid, label, CONSTANTS.INCREMENT);
      } else {
        saveNoteNew(uid, selectedCollection, title, desc);
        updateCollectionCount(uid, selectedCollection.text, CONSTANTS.INCREMENT);
      }

      setTitle('');
      setDesc('');
      if (itemID || label) {
        navigation.goBack();
      } else {
        navigation.navigate(NAVIGATION.HOMESCREEN);
      }
    } catch (error) {
      console.error(ERR_CONSOLE.SAVE_NOTE, error);
    } finally {
      setIsSaving(false);
    }
  };

  
  const setCollection = async () => {
    const updatedCollections = [
      ...collections,
      {text: newCollection.trim(), number: 0},
    ];
    await firestore().collection(COLLECTION.USERS).doc(uid).set(
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
        console.error(ADDNOTE.ERROR, error);
      }
    }
    setModalVisible(false);
    setNewCollection('');
  };

  const renderCollectionItem = ({
    item,
  }: {
    item: {text: string; number: number};
  }) => (
    <TouchableOpacity
      style={styles.collectionItem}
      onPress={() => handleCollectionSelection(item)}>
      <Text style={styles.collectionText(colors)}>{item.text}</Text>
    </TouchableOpacity>
  );

  const handleCollectionSelection = (collection: {
    text: string;
    number: number;
  }) => {
    setSelectedCollection(collection);
    setModalVisible(false);
    setEmptyColl(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container(colors)}
      keyboardVerticalOffset={97}
      >
      <View style={styles.view}>
        <View></View>
        <View>
          {itemID || label ? null : (
            <TouchableOpacity
              style={styles.collButton(colors)}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.collText(colors)}>
                {selectedCollection.text}
              </Text>
            </TouchableOpacity>
          )}
          <Modal
          style={{alignItems:'center'}}
            isVisible={modalVisible}
            avoidKeyboard={true}
            onBackButtonPress={() => {
              setModalVisible(false);
            }}>
              <View
                style={[
                  profileImgStyles.modalContainer(colors),
                  {
                    maxHeight:dimensions.height*0.5,
                    width: dimensions.width * 0.8,
                  },
                ]}>
                <View style={styles.closeButtonView}>
                  <View style={styles.inner}>
                    <Text style={styles.heading(colors)}>{ADDNOTE.COLLECTIONS} </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.xButton(colors)}
                    onPress={() => {
                      setModalVisible(false);
                      setEmptyColl(false);
                    }}>
                    <Text style={styles.text(colors)}>{ADDNOTE.CLOSE}</Text>
                  </TouchableOpacity>
                </View>
              
                <FlatList
                  data={collections}
                  // style={{maxHeight:dimensions.height*0.5}}
                  renderItem={renderCollectionItem}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
                <TextInput
                  style={styles.newCollectionInput(colors)}
                  placeholder={ADDNOTE.ADD_COLLECTION}
                  value={newCollection}
                  onChangeText={setNewCollection}
                  placeholderTextColor={colors.HEADERTITLE}
                  maxLength={20}
                  onBlur={() => setEmptyColl(false)}
                />
                {emptyColl && newCollection === '' && (
                  <Text style={styles.err}>
                    {ADDNOTE.ENTER_COLLECTION}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.addButton(colors)}
                  onPress={addCollection}>
                  <Text style={styles.addTxt(colors)}>{ADDNOTE.ADD}</Text>
                </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>

      <TextInput
        value={title}
        style={styles.title(colors)}
        placeholder={ADDNOTE.TITLE}
        multiline={true}
        maxLength={60}
        onChangeText={text => setTitle(text)}
        placeholderTextColor={commonColors.GRAY}
      />

      <RichEditor
        ref={richText}
        placeholder={ADDNOTE.NOTE}
        initialContentHTML={desc}
        onChange={handleDesc}
        initialHeight={80}
        scrollEnabled={true}
        onLink={async url => {
          try {
            const result = await Linking.openURL(url);
          } catch (error) {
            console.error(ERR_CONSOLE.OPENING_URL, error);
          }
        }}
        editorStyle={styles.editor(colors)}
        style={styles.desc(colors)}
      />

      <View style={styles.center}>
        <View style={styles.buttonShadow(colors)}>
          <TouchableOpacity onPress={saveNote}>
            <Text style={styles.buttonTxt(colors)}>{ADDNOTE.SAVE}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.flex}>
        <RichToolbar
          style={styles.toolbar(colors)}
          editor={richText}
          iconTint={themeColors.LIGHT.GRAY}
          selectedIconTint={themeColors.LIGHT.DARK_BLUE}
          onInsertLink={handleInsertLink}
          actions={[
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
};

export default AddNote;
