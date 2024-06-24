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
} from 'react-native';
import HTML, {
  HTMLContentModel,
  HTMLElementModel,
  defaultHTMLElementModels,
} from 'react-native-render-html';
import {getChildrenStyle, showStyles} from './styles';
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
import {Note} from './show_notes';
import {CONSTANTS, ERR_CONSOLE, SHOW_NOTES} from '../../Constants/strings';
import {
  deleteNote,
  updateCollectionCount,
  userDocRef,
} from '../../Common/firebaseUtils';
import EditCollection from './EditCollection';
import Chartboost from './InterstitialAdIos';

const BannerModule = NativeModules.BannerModule;
const InterstitialModule = NativeModules.InterstitialModule; //android

const NotesScreen: React.FC<NoteScreenProps> = ({route, navigation}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [fullNotes, setFullNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [itemUid, setItemUid] = useState<string | null>(null);
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const {uid, itemText} = route.params;

  useEffect(() => {
    // BannerModule.showToast("effect");
    // BannerModule.showBannerAd();
    if (Platform.OS === 'android') {
      InterstitialModule.showInterstitialAd();
    }
  }, []);

  useEffect(() => {
    Chartboost.loadInterstitial('interstitial_ad_ios');

    setTimeout(()=> {
      Chartboost.showInterstitial('interstitial_ad_ios');
    }, 1000)
    

    const onAdLoaded = (event: {location: string}) => {
      console.log('Ad loaded:', event.location);
    };

    const onAdFailedToLoad = (event: {location: string; error?: string}) => {
      console.log('Ad failed to load:', event.location, event.error);
    };

    const onAdShown = (event: {location: string}) => {
      console.log('Ad shown:', event.location);
    };

    const onAdDismissed = (event: {location: string}) => {
      console.log('Ad dismissed:', event.location);
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
  }, []);

  // const loadAd = () => {
  //   Chartboost.loadInterstitial('MySpecificScreen');
  // };

  // const showAd = () => {
  //   Chartboost.showInterstitial('MySpecificScreen');
  // };

  useEffect(() => {
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
  }, [uid, itemText]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: itemText,
      headerRight: () => (
        <TouchableOpacity onPress={handleCollectionEdit}>
          {ICONS.MENU(25, 25, colors.HEADERTITLE)}
        </TouchableOpacity>
      ),
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
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={showStyles.wrapper(colors)}
      keyboardVerticalOffset={97}>
      <View style={showStyles.input}>
        <TextInput
          style={inputStyles.customInput(colors)}
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
        <Text style={showStyles.noNotes(colors)}>{SHOW_NOTES.ADD_NOTE}</Text>
      )}
      {notes.length === 0 && searchQuery !== '' && (
        <Text style={showStyles.noNotes(colors)}>{SHOW_NOTES.NO_NOTES}</Text>
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
              {SHOW_NOTES.NEW_NOTES}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={showStyles.modalBackground}>
          <View style={showStyles.modalContainer(colors)}>
            <Text style={showStyles.modalTitle(colors)}>
              {SHOW_NOTES.DELETE_NOTES}
            </Text>
            <Text style={showStyles.modalMessage(colors)}>
              {SHOW_NOTES.ARE_YOU_SURE}
            </Text>
            <View style={showStyles.modalButtons}>
              <TouchableOpacity onPress={handleDeleteNote}>
                <Text style={showStyles.modalText(colors)}>
                  {CONSTANTS.YES}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={showStyles.modalText(colors)}>{CONSTANTS.NO}</Text>
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
