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
  Keyboard,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import Modal from 'react-native-modal';
import {NAVIGATION} from '../../Constants/navConstants';
import {styles} from './styles';
import StaggerView from '@mindinventory/react-native-stagger-view';
import {useReduxSelector} from '../../Redux/Store/store';
import {
  commonColors,
  getThemeColors,
  themeColors,
} from '../../Assets/Colors/themeColors';
import CustomDialogInput from './CustomDialogInput';
import {AddNoteScreenProps} from '../../Navigation/routeTypes';
import {
  ADDNOTE,
  COLLECTION,
  CONSTANTS,
  ERR_CONSOLE,
  ERR_MSG,
  ERR_TITLE,
} from '../../Constants/strings';
import {showAlert} from '../../Common/alert';
import {
  saveNoteLabel,
  saveNoteNew,
  setCollection,
  updateCollectionCount,
  updateNote,
  userDocRef,
} from '../../Common/firebaseUtils';
import {CollectionItem} from '../../Common/common';
import ImageHandling from './ImageHandling';
import useAuthentication from '../../Components/CustomHook/authHook';
import {profileImgStyles} from '../../Components/ProfileImage/styles';
import {showStyles} from '../ShowNotes/styles';
import { useQuery, useRealm } from '@realm/react';
import { CollectionModel } from '../../Common/database';

const AddNote: React.FC<AddNoteScreenProps> = ({route, navigation}) => {
  const {isLoading} = useReduxSelector(state => state.loader);
  const [title, setTitle] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [newCollection, setNewCollection] = useState<string>('');
  const [imageArray, setImageArray] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false);
  const [selectedCollection, setSelectedCollection] = useState<{
    number: number;
    text: string;
  }>({
    number: 1,
    text: COLLECTION.OTHERS,
  });
  const {deleteImageFromFirebase, deleteImageFromFirestore} =
    useAuthentication();
  const [emptyColl, setEmptyColl] = useState<boolean>(false);
  const richText = useRef<RichEditor>(null);
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const realm = useRealm();
  const collectionsModel = useQuery(CollectionModel);
  const connection = useReduxSelector(state => state.internet.connection);

  const {uid, itemTitle, itemDesc, itemID, label, imageUrls} = route.params;

  useEffect(() => {
    if (itemTitle || itemDesc || imageUrls) {
      setTitle(itemTitle as string);
      setDesc(itemDesc as string);
    }
    if (imageUrls) {
      setImageArray(imageUrls);
    }
  }, [itemTitle, itemDesc, imageUrls]);

  // useEffect(() => {
  //   const unsubscribe = userDocRef(uid).onSnapshot(snapshot => {
  //     if (snapshot.exists) {
  //       const userData = snapshot.data();
  //       if (userData?.collections) {
  //         setCollections(userData.collections);
  //       }
  //     }
  //   });

  //   return () => unsubscribe();
  // }, [uid]);

  useEffect(() => {  
    const fetchCollections = () => {
      if (connection) {
        const unsubscribe = userDocRef(uid).onSnapshot(snapshot => {
          if (snapshot?.exists) {
            const userData = snapshot?.data();
            if (userData && userData.collections) {
              setCollections(userData.collections);
            }
          }
        });
        return () => unsubscribe();
      } else {
        if (realm && !realm.isClosed) {
          const validCollections = collectionsModel.filter(item => item.isValid());
          const localCollections = validCollections.map(item => ({
            text: item.text,
            number: item.number,
          }));
          setCollections(localCollections);
  
          const listener = () => {
              const updatedCollections = validCollections.map(item => ({
                text: item.text,
                number: item.number,
              }));
              setCollections(updatedCollections);
          };
  
          collectionsModel.addListener(listener);
  
          return () => {
            collectionsModel.removeListener(listener);
          };
        }
      }
    };
  
    fetchCollections();

  }, [connection, uid, collectionsModel, realm]);

  const handleInsertLink = () => {
    setIsDialogVisible(true);
  };

  const handleImageChange = (uri: string) => {
    setImageArray(prevUrls => [...prevUrls, uri]);
  };

  const handleCancel = () => {
    setIsDialogVisible(false);
    setInputValue('');
  };

  const handleSubmit = () => {
    if (inputValue === '') {
      Alert.alert(ERR_TITLE.NO_URL, ERR_MSG.ENTER_URL);
      return;
    }
    richText.current?.insertLink(inputValue, inputValue);
    setInputValue('');
    setIsDialogVisible(false);
  };

  const handleDesc = (text: string) => {
    setDesc(text);
  };

  const stripHtmlTags = (str: string) => {
    const noTags = str.replace(ADDNOTE.TAGS_REGEX, '');
    const noEntities = noTags.replace(ADDNOTE.ENTITY_REGEX, '');
    return noEntities.trim();
  };

  const saveNote = async () => {
    const strippedDesc = stripHtmlTags(desc);

    if (
      title.trim() === '' &&
      strippedDesc === '' &&
      imageArray?.length === 0
    ) {
      showAlert(ERR_TITLE.EMPTY_NOTE, ERR_MSG.NOTE_DISCARDED);
      navigation.goBack();
      return;
    }
    try {
      if(connection){
      if (itemID && label) {
        updateNote(uid, label, itemID, title, desc, imageArray);
      } 
      else if (label) {
        saveNoteLabel(uid, label, title, desc, imageArray);
        updateCollectionCount(uid, label, CONSTANTS.INCREMENT);
      } else {
        // saveNoteNew(uid, selectedCollection, title, desc, imageArray);
        saveNoteLabel(uid, selectedCollection.text, title, desc, imageArray)
        updateCollectionCount(
          uid,
          selectedCollection.text,
          CONSTANTS.INCREMENT,
        );
      }
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
      // setIsSaving(false);
    }
  };

  const addCollection = async () => {
    Keyboard.dismiss();
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
        setCollection(collections, setCollections, newCollection, uid, connection, realm);
        setSelectedCollection({text: trimmedNewCollection, number: 1});
      } catch (error) {
        console.error(ADDNOTE.ERROR, error);
      }
      setModalVisible(false);
      setNewCollection('');
    }
  };

  const renderCollectionItem = ({
    item,
  }: {
    item: {text: string; number: number};
  }) => (
    <TouchableOpacity
      style={styles(colors).collectionItem}
      onPress={() => handleCollectionSelection(item)}>
      <Text style={styles(colors).collectionText}>{item.text}</Text>
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

  const renderItem = ({item}: {item: string}) => (
    <View style={styles(colors).imgParent}>
      <ImageBackground
        source={{uri: item}}
        style={styles(colors).imgBg}
        resizeMode="cover">
        <TouchableOpacity
          style={styles(colors).imgButton}
          onPress={() => handleImageButtonPress(item)}>
          <Text style={styles(colors).imgX}>{ADDNOTE.CLOSE}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );

  const handleImageButtonPress = async (uri: string) => {
    try {
      await deleteImageFromFirebase(uri);

      if (itemID && label) {
        await deleteImageFromFirestore(uid, label, uri, itemID);
      }
      const updatedImages = imageArray.filter(imageUri => imageUri !== uri);
      setImageArray(updatedImages);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === CONSTANTS.IOS ? 'padding' : undefined}
      style={styles(colors).container}
      keyboardVerticalOffset={97}>
      <View style={styles(colors).view}>
        <View></View>
        <View>
          {itemID || label ? null : (
            <TouchableOpacity
              style={styles(colors).collButton}
              onPress={() => setModalVisible(true)}>
              <Text
                style={styles(colors).collText}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {selectedCollection.text}
              </Text>
            </TouchableOpacity>
          )}
          <Modal
            style={styles(colors).align}
            isVisible={modalVisible}
            avoidKeyboard={true}
            onBackButtonPress={() => {
              setModalVisible(false);
            }}>
            <View
              style={[
                profileImgStyles(colors).modalContainer,
                styles(colors).area,
              ]}>
              <View style={styles(colors).closeButtonView}>
                <View style={styles(colors).inner}>
                  <Text style={styles(colors).heading}>
                    {ADDNOTE.COLLECTIONS}{' '}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles(colors).xButton}
                  onPress={() => {
                    setModalVisible(false);
                    setEmptyColl(false);
                  }}>
                  <Text style={styles(colors).text}>{ADDNOTE.CLOSE}</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={collections}
                renderItem={renderCollectionItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
              <TextInput
                style={styles(colors).newCollectionInput}
                placeholder={ADDNOTE.ADD_COLLECTION}
                value={newCollection}
                onChangeText={setNewCollection}
                placeholderTextColor={colors.HEADERTITLE}
                maxLength={20}
                onBlur={() => setEmptyColl(false)}
              />
              {emptyColl && newCollection === '' && (
                <Text style={styles(colors).err}>
                  {ADDNOTE.ENTER_COLLECTION}
                </Text>
              )}
              <TouchableOpacity
                style={styles(colors).addButton}
                onPress={addCollection}>
                <Text style={styles(colors).addTxt}>{ADDNOTE.ADD}</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>

      <TextInput
        value={title}
        style={styles(colors).title}
        placeholder={ADDNOTE.TITLE}
        multiline={true}
        maxLength={60}
        onChangeText={text => setTitle(text)}
        placeholderTextColor={commonColors.GRAY}
      />

      {imageArray && imageArray.length != 0 && (
        <StaggerView
          style={showStyles(colors).list}
          data={imageArray}
          renderItem={renderItem}
          numColumns={2}
          animationType="NONE"
        />
      )}

      <RichEditor
        scrollEnabled
        ref={richText}
        initialHeight={80}
        keyboardDisplayRequiresUserAction={false}
        placeholder={ADDNOTE.NOTE}
        initialContentHTML={desc}
        style={styles(colors).desc}
        editorStyle={{
          ...styles(colors).editor,
          contentCSSText:
            Platform.OS === 'android'
              ? `max-height:${Dimensions.get('window').height * 0.7}px;`
              : undefined,
        }}
        onChange={commentText => {
          handleDesc(commentText);
        }}
        onLink={async url => {
          try {
            const result = await Linking.openURL(url);
          } catch (error) {
            console.error(ERR_CONSOLE.OPENING_URL, error);
          }
        }}
      />

      <View style={styles(colors).center}>
        {isLoading ? (
          <ActivityIndicator size="large" color={themeColors.LIGHT.BLUE} />
        ) : (
          <View style={styles(colors).buttonShadow}>
            <TouchableOpacity onPress={saveNote}>
              <Text style={styles(colors).buttonTxt}>{ADDNOTE.SAVE}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles(colors).flex}>
        <RichToolbar
          style={styles(colors).toolbar}
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
            actions.insertImage,
            actions.heading1,
          ]}
          iconMap={{
            [actions.insertImage]: () => (
              <ImageHandling onImageChange={handleImageChange} />
            ),
          }}
        />
        <CustomDialogInput
          isVisible={isDialogVisible}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          handleInput={setInputValue}
          input={inputValue}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddNote;
