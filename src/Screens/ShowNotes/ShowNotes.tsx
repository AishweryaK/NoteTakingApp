import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import HTML from 'react-native-render-html';
import {showStyles} from './styles';
import {NAVIGATION} from '../../Constants/navConstants';
import {dimensions} from '../../Constants/utility';
import {inputStyles} from '../../Components/CustomInput/styles';
import filter from 'lodash.filter';
import {FONT} from '../../Constants/fontConstants';
import {homeStyles} from '../HomeScreen/homeStyle';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import StaggerView from '@mindinventory/react-native-stagger-view';
import {ICONS} from '../../Constants/iconConstants';
import {NoteScreenProps} from '../../Navigation/routeTypes';
import { Note } from '.';
import { COLLECTION, ERR_CONSOLE } from '../../Constants/strings';


const NotesScreen: React.FC<NoteScreenProps> = ({route, navigation}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [fullNotes, setFullNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const {uid, itemText} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [itemUid, setItemUid] = useState<string | null>(null);
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(COLLECTION.USERS)
      .doc(uid)
      .collection(itemText)
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const notesData: Note[] = [];
        snapshot.forEach(docSnapshot => {
          notesData.push({
            ...docSnapshot.data(),
            id: docSnapshot.id,
          } as Note);
        });
        setNotes(notesData);
        setFullNotes(notesData);
      });

    return () => unsubscribe();
  }, [uid]);


  const handleNotePress = (item: Note) => {
    navigation.navigate(NAVIGATION.ADDNOTE, {
      uid: uid,
      itemTitle: item.title,
      itemDesc: item.desc,
      itemID: item.id,
      label: itemText,
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredNotes = filter(fullNotes, note => {
      return contains(note, formattedQuery);
    });
    setNotes(filteredNotes);
  };

  const contains = ({title, desc}: Note, query: string) => {
    return (
      title.toLowerCase().includes(query) || desc.toLowerCase().includes(query)
    );
  };

  const handleAddNote = () => {
    navigation.navigate(NAVIGATION.ADDNOTE, {uid: uid, label: itemText});
  };

  const handleLongPress = (itemUid: string) => {
    setItemUid(itemUid);
    setModalVisible(true);
  };

  const decLabelCollection = async () => {
    const collectionRef = firestore().collection(COLLECTION.USERS).doc(uid);
    const doc = await collectionRef.get();
    if (doc.exists) {
      const userData = doc.data();
      const updatedCollections = userData?.collections.map(
        (collection: {text: string; number: number}) => {
          if (collection.text === itemText) {
            return {
              ...collection,
              number: collection.number - 1,
            };
          }
          return collection;
        },
      );
      await collectionRef.set({collections: updatedCollections}, {merge: true});
    }
  };

  const deleteNote = async () => {
    await firestore()
      .collection(COLLECTION.USERS)
      .doc(uid)
      .collection(itemText)
      .doc(itemUid as string)
      .delete();
  };

  const handleDeleteNote = async () => {
    try {
      await deleteNote();
      setModalVisible(false);
      setItemUid(null);

      await decLabelCollection();
    } catch (error) {
      console.error(ERR_CONSOLE.DELETE_NOTE, error);
    }
  };

  const MemoizedHTML = React.memo(HTML);

  const renderItem = ({item}: {item: Note}) => (
    <TouchableOpacity
      key={item.id} //////
      style={getChildrenStyle()}
      onPress={() => handleNotePress(item)}
      onLongPress={() => handleLongPress(item.id)}>
      {item.title && <Text style={showStyles.txt(colors)}>{item.title}</Text>}
      <MemoizedHTML
        baseStyle={{
          fontFamily: FONT.BOLD,
          fontSize: 14,
          lineHeight: 18.2,
          opacity: 0.67,
          color: colors.HEADERTITLE,
          maxHeight: dimensions.height * 0.16,
          overflow: 'hidden',
        }}
        source={{html: item.desc}}
        contentWidth={dimensions.width}
      />
    </TouchableOpacity>
  );

  const getChildrenStyle = () => {
    return {
      backgroundColor: colors.BACKGROUND,
      marginBottom: 10,
      marginHorizontal: 8,
      borderRadius: 20,
      padding: 20,
      fontFamily: FONT.REGULAR,
      shadowColor: colors.SHADOW,
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 7,
    };
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={showStyles.wrapper(colors)}
      keyboardVerticalOffset={97}>
      <View style={showStyles.input}>
        <TextInput
          style={inputStyles.customInput(colors)}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={colors.PLACEHOLDER}
        />
      </View>
      {notes.length === 0 && searchQuery === '' && (
        <Text style={showStyles.noNotes(colors)}>
          Add a note to start your collection!
        </Text>
      )}
      {notes.length === 0 && searchQuery !== '' && (
        <Text style={showStyles.noNotes(colors)}>No matching notes</Text>
      )}
      <StaggerView<Note>
        style={showStyles.list}
        data={notes}
        renderItem={renderItem}
        numColumns={2}
        animationType="NONE"
      />
      <View style={{alignItems: 'center'}}>
        <View
          style={[homeStyles.buttonShadow(colors), showStyles.bottomButton]}>
          <TouchableOpacity style={showStyles.button} onPress={handleAddNote}>
            <View style={{justifyContent: 'center'}}>{ICONS.ADD(30, 30)}</View>
            <Text
              style={[
                homeStyles.buttonText(colors),
                {textAlignVertical: 'center'},
              ]}>
              Add New Notes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={showStyles.modalBackground}>
          <View style={showStyles.modalContainer(colors)}>
            <Text style={showStyles.modalTitle(colors)}>Delete Note</Text>
            <Text style={showStyles.modalMessage(colors)}>
              Are you sure you want to delete this note?
            </Text>
            <View style={showStyles.modalButtons}>
              <TouchableOpacity onPress={handleDeleteNote}>
                <Text style={showStyles.modalText(colors)}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
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
