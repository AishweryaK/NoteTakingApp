import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  NativeModules,
  Image,
} from 'react-native';
import HTML, {
  HTMLContentModel,
  HTMLElementModel,
  defaultHTMLElementModels,
} from 'react-native-render-html';
import {NAVIGATION} from '../../Constants/navConstants';
import {dimensions} from '../../Constants/utility';
import filter from 'lodash.filter';
import {FONT} from '../../Constants/fontConstants';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors, themeColors} from '../../Assets/Colors/themeColors';
import StaggerView from '@mindinventory/react-native-stagger-view';
import {ICONS} from '../../Constants/iconConstants';
import {NoteScreenProps} from '../../Navigation/routeTypes';
import {Note} from './show_notes';
import {
  COLLECTION,
  CONSTANTS,
  ERR_CONSOLE,
  SHOW_NOTES,
} from '../../Constants/strings';
import {
  deleteNote,
  updateCollectionCount,
  userDocRef,
} from '../../Common/firebaseUtils';
import EditCollection from './EditCollection';
import Chartboost from './InterstitialAdIos';
import {getChildrenStyle, showStyles} from './styles';
import {inputStyles} from '../../Components/CustomInput/styles';
import {homeStyles} from '../HomeScreen/homeStyle';
import {useQuery, useRealm} from '@realm/react';
import {NotesModel} from '../../Common/database';

const BannerModule = NativeModules.BannerModule; //android
const InterstitialModule = NativeModules.InterstitialModule; //android

const NotesScreen: React.FC<NoteScreenProps> = ({route, navigation}) => {
  const {uid, itemText} = route.params;
  const [notes, setNotes] = useState<Note[]>([]);
  const [fullNotes, setFullNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [itemUid, setItemUid] = useState<string | null>(null);
  const theme = useReduxSelector(state => state.user.theme);
  const connection = useReduxSelector(state => state.internet.connection);
  const colors = getThemeColors(theme);
  const realm = useRealm();
  const realmNotes = useQuery(NotesModel, dbNotes =>
    dbNotes.filtered('collection == $0', itemText),
  );

  console.log(realmNotes,"REALMNOTES");
  
  useEffect(() => {
    if (Platform.OS === CONSTANTS.ANDROID) {
      InterstitialModule.showInterstitialAd();
    } else if (Platform.OS === CONSTANTS.IOS) {
      Chartboost.loadInterstitial(SHOW_NOTES.AD_LOCATION);

      setTimeout(() => {
        Chartboost.showInterstitial(SHOW_NOTES.AD_LOCATION);
      }, 1000);
      const onAdLoaded = (event: {location: string}) => {
        // console.log(SHOW_NOTES.AD_LOADED, event.location);
      };
      const onAdFailedToLoad = (event: {location: string; error?: string}) => {
        // console.log(SHOW_NOTES.AD_FAILED, event.location, event.error);
      };
      const onAdShown = (event: {location: string}) => {
        // console.log(SHOW_NOTES.AD_SHOWN, event.location);
      };
      const onAdDismissed = (event: {location: string}) => {
        // console.log(SHOW_NOTES.AD_DISMISSED, event.location);
      };
      const subscriptions = [
        Chartboost.addEventListener('onAdLoaded', onAdLoaded),
        Chartboost.addEventListener('onAdFailedToLoad', onAdFailedToLoad),
        Chartboost.addEventListener('onAdShown', onAdShown),
        Chartboost.addEventListener('onAdDismissed', onAdDismissed),
      ];
      return () => {
        subscriptions.forEach(sub => sub.remove());
      };
    }
  }, []);

  // useEffect(() => {
  //   const unsubscribe = userDocRef(uid)
  //     .collection(itemText)
  //     .orderBy(SHOW_NOTES.CREATED_AT, 'desc')
  //     .onSnapshot(snapshot => {
  //       const notesData: Note[] = [];
  //       snapshot.forEach(docSnapshot => {
  //         notesData.push({
  //           ...docSnapshot.data(),
  //           id: docSnapshot.id,
  //         } as Note);
  //       });
  //       setNotes(notesData);
  //       setFullNotes(notesData);
  //     });

  //   return () => unsubscribe();
  // }, [uid, itemText]);

  useEffect(() => {
    const fetchNotes = () => {
      if (connection) {
        const unsubscribe = userDocRef(uid)
          .collection(itemText)
          .orderBy(SHOW_NOTES.CREATED_AT, 'desc')
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
      } else {
        if (realm && !realm.isClosed) {
          const validNotes = realmNotes.filter(item => item.isValid());
          const localNotes = validNotes.map(item => ({
            id: item._id,
            title: item.title,
            desc: item.desc,
            imageUrls: item.imageUrls,
          }));
          setNotes(localNotes as Note[]);

          const listener = () => {
            const updatedNotes = validNotes.map(item => ({
              id: item._id,
              title: item.title,
              desc: item.desc,
              imageUrls: item.imageUrls,
            }));
            setNotes(updatedNotes as Note[]);
          };

          realmNotes.addListener(listener);

          return () => {
            realmNotes.removeListener(listener);
          };
        }
      }
    };
    fetchNotes();
  }, [uid, itemText, connection, realm, realmNotes]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: itemText,
      headerRight: () =>
        itemText !== COLLECTION.OTHERS ? (
          <TouchableOpacity onPress={handleCollectionEdit}>
            {ICONS.MENU(25, 25, colors.HEADERTITLE)}
          </TouchableOpacity>
        ) : null,
    });
  }, [navigation, itemText, colors]);

  const handleCollectionEdit = () => {
    setDialogVisible(true);
  };

  const closeCollectionEdit = () => {
    setDialogVisible(false);
  };

  const handleNotePress = (item: Note) => {
    navigation.navigate(NAVIGATION.ADDNOTE, {
      uid: uid,
      itemTitle: item.title,
      itemDesc: item.desc,
      itemID: item.id,
      label: itemText,
      imageUrls: item.imageUrls,
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

  const handleDeleteNote = async () => {
    try {
      await deleteNote(uid, itemText, itemUid as string);
      setModalVisible(false);
      setItemUid(null);
      updateCollectionCount(uid, itemText, CONSTANTS.DECREMENT);
    } catch (error) {
      console.error(ERR_CONSOLE.DELETE_NOTE, error);
    }
  };

  const MemoizedHTML = React.memo(HTML);

  const renderItem = ({item}: {item: Note}) => (
    <TouchableOpacity
      key={item.id} //////
      style={getChildrenStyle(colors)}
      onPress={() => handleNotePress(item)}
      onLongPress={() => handleLongPress(item.id)}>
      {item.title && <Text style={showStyles(colors).txt}>{item.title}</Text>}

      {item.imageUrls && item.imageUrls?.length != 0 && (
        <View style={showStyles(colors).imgParent}>
          <Image
            source={{uri: item.imageUrls[0]}}
            style={showStyles(colors).img}
          />
        </View>
      )}
      <MemoizedHTML
        baseStyle={{
          fontFamily: FONT.BOLD,
          fontSize: 14,
          lineHeight: 18.2,
          opacity: 0.67,
          color: colors.HEADERTITLE,
          maxHeight: dimensions.height * 0.16,
          overflow: 'hidden',
          paddingTop: 3,
        }}
        source={{html: item.desc}}
        contentWidth={dimensions.width}
        customHTMLElementModels={{
          ...defaultHTMLElementModels,
          input: HTMLElementModel.fromCustomModel({
            tagName: 'input',
            contentModel: HTMLContentModel.mixed,
            isVoid: true,
          }),
        }}
        ignoredDomTags={['input']}
      />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === CONSTANTS.IOS ? 'padding' : undefined}
      style={showStyles(colors).wrapper}
      keyboardVerticalOffset={97}>
      <View style={showStyles(colors).input}>
        <TextInput
          style={inputStyles(colors).customInput}
          placeholder={SHOW_NOTES.PLACEHOLDER}
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={colors.PLACEHOLDER}
        />
      </View>
      {/* <TouchableOpacity style={{backgroundColor:'red'}} onPress={()=>BannerModule.showToast("HELLO")}>
        <Text>Hi</Text>
      </TouchableOpacity> */}
      {notes.length === 0 && searchQuery === '' && (
        <Text style={showStyles(colors).noNotes}>{SHOW_NOTES.ADD_NOTE}</Text>
      )}
      {notes.length === 0 && searchQuery !== '' && (
        <Text style={showStyles(colors).noNotes}>{SHOW_NOTES.NO_NOTES}</Text>
      )}
      <StaggerView
        style={showStyles(colors).list}
        data={notes}
        renderItem={renderItem}
        numColumns={2}
        animationType="NONE"
      />
      <View style={{alignItems: 'center'}}>
        <View
          style={[
            homeStyles(colors).buttonShadow,
            showStyles(colors).bottomButton,
          ]}>
          <TouchableOpacity
            style={showStyles(colors).button}
            onPress={handleAddNote}>
            <View style={{justifyContent: 'center'}}>{ICONS.ADD(30, 30)}</View>
            <Text
              style={[
                homeStyles(colors).buttonText,
                {textAlignVertical: 'center'},
              ]}>
              {SHOW_NOTES.NEW_NOTES}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={showStyles(colors).modalBackground}>
          <View style={showStyles(colors).modalContainer}>
            <Text style={showStyles(colors).modalTitle}>
              {SHOW_NOTES.DELETE_NOTES}
            </Text>
            <Text style={showStyles(colors).modalMessage}>
              {SHOW_NOTES.ARE_YOU_SURE}
            </Text>
            <View style={showStyles(colors).modalButtons}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text
                  style={[
                    showStyles(colors).modalText,
                    showStyles(colors).cancelButton,
                  ]}>
                  {CONSTANTS.CANCEL}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeleteNote}>
                <Text
                  style={[
                    showStyles(colors).modalText,
                    showStyles(colors).deleteButton,
                  ]}>
                  {CONSTANTS.DELETE}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <EditCollection
        visible={dialogVisible}
        onClose={closeCollectionEdit}
        label={itemText}
        navigation={navigation}
      />
    </KeyboardAvoidingView>
  );
};

export default NotesScreen;
