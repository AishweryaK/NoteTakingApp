import React, {useMemo, useState, useEffect, FC} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CustomLabel from '../CustomLabel/CustomLabel';
import {NAVIGATION} from '../../Constants/navConstants';
import {useReduxSelector} from '../../Redux/Store/store';
import AvailSpace from '../../Screens/HomeScreen/AvailSpace';
import {showStyles} from '../../Screens/ShowNotes/styles';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {HomeProps} from '../../Navigation/routeTypes';
import {COLLECTION, CONSTANTS, CUSTOM_LIST, ERR_CONSOLE, ERR_MSG, ERR_TITLE} from '../../Constants/strings';
import { showAlert } from '../../Common/alert';
import { styles } from './styles';
import { CollectionItem } from '../../Common/common';


const CustomList: FC<HomeProps> = ({navigation}) => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const user = useReduxSelector(state => state.user);
  const colors = getThemeColors(user.theme);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [collName, setCollName] = useState<string>('');

  useEffect(() => {
    const userDocRef = firestore().collection(COLLECTION.USERS).doc(user.uid);
    const unsubscribe = userDocRef.onSnapshot(snapshot => {
      if (snapshot.exists) {
        const userData = snapshot.data();
        if (userData && userData.collections) {
          setCollections(userData.collections);
        }
      }
    });

    return () => unsubscribe();
  }, [user.uid]);

  const handleLongPress = (collName: string) => {
    setCollName(collName);
    setModalVisible(true);
  };

  const removeCollectionFromFirestore = async (collName: string) => {
    const collectionItem = collections.find(
      collection => collection.text === collName,
    );
    const number = collectionItem ? collectionItem.number : 1;
    const userDocRef = firestore().collection(COLLECTION.USERS).doc(user.uid);

    await userDocRef.update({
      collections: firestore.FieldValue.arrayRemove({
        text: collName,
        number: number,
      }),
    });
  };

  const handleDeleteCollection = async () => {
    if (
      collName === COLLECTION.PERSONAL ||
      collName === COLLECTION.ACADEMIC ||
      collName === COLLECTION.WORK ||
      collName === COLLECTION.OTHERS
    ) {
      showAlert(ERR_TITLE.ACTION_NOT_ALLOWED,ERR_MSG.CANNOT_DELETE);
      setModalVisible(false);
      return;
    }
    try {
      const collectionRef = firestore()
        .collection(COLLECTION.USERS)
        .doc(user.uid)
        .collection(collName);

      const snapshot = await collectionRef.get();

      const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);

      await removeCollectionFromFirestore(collName);

      setCollections(prevCollections =>
        prevCollections.filter(collection => collection.text !== collName),
      );

      setModalVisible(false);
    } catch (error) {
      console.error(ERR_CONSOLE.DELETE_COLLECTION, error);
    }
  };

  const renderItem = useMemo(() => {
    return ({item}: {item: CollectionItem}) => (
      <View style={styles.view}>
        <CustomLabel
          handleLongPress={() => handleLongPress(item.text)}
          handlePress={() =>
            navigation.navigate(NAVIGATION.NOTESCREEN, {
              uid: user.uid,
              itemText: item.text,
            })
          }
          text={item.text}
          number={item.number}
        />
      </View>
    );
  }, [navigation, user.uid]);

  return (
    <>
      <FlatList
        data={collections}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        nestedScrollEnabled={true}
        ListHeaderComponent={<AvailSpace />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatList}
      />
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={showStyles.modalBackground}>
          <View style={showStyles.modalContainer(colors)}>
            <Text style={showStyles.modalTitle(colors)}>{CUSTOM_LIST.DELETE_COLLETION}</Text>
            <Text style={showStyles.modalMessage(colors)}>
              {CUSTOM_LIST.ARE_YOU_SURE} {collName} {CUSTOM_LIST.COLLECTION}
            </Text>
            <View style={showStyles.modalButtons}>
              <TouchableOpacity onPress={handleDeleteCollection}>
                <Text style={showStyles.modalText(colors)}>{CONSTANTS.YES}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={showStyles.modalText(colors)}>{CONSTANTS.NO}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default React.memo(CustomList);
