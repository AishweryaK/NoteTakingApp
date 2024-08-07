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
import {getThemeColors, themeColors} from '../../Assets/Colors/themeColors';
import {HomeProps} from '../../Navigation/routeTypes';
import {COLLECTION, CONSTANTS, CUSTOM_LIST, ERR_CONSOLE, ERR_MSG, ERR_TITLE} from '../../Constants/strings';
import { showAlert } from '../../Common/alert';
import { styles } from './styles';
import { CollectionItem } from '../../Common/common';
import { handleDeleteCollection, removeCollectionFromFirestore, userDocRef } from '../../Common/firebaseUtils';


const CustomList: FC<HomeProps> = ({navigation}) => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const user = useReduxSelector(state => state.user);
  const colors = getThemeColors(user.theme);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [collName, setCollName] = useState<string>('');

  useEffect(() => {
    const unsubscribe = userDocRef(user.uid).onSnapshot(snapshot => {
      if (snapshot?.exists) {
        const userData = snapshot?.data();
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
        <View style={showStyles(colors).modalBackground}>
          <View style={showStyles(colors).modalContainer}>
            <Text style={showStyles(colors).modalTitle}>{CUSTOM_LIST.DELETE_COLLETION}</Text>
            <Text style={showStyles(colors).modalMessage}>
              {CUSTOM_LIST.ARE_YOU_SURE} {collName} {CUSTOM_LIST.COLLECTION}
            </Text>
            <View style={showStyles(colors).modalButtons}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={[
                    showStyles(colors).modalText,
                    {backgroundColor: colors.CANCEL, borderRadius: 10},
                  ]}>{CONSTANTS.CANCEL}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleDeleteCollection(user.uid, collections, collName, setCollections, setModalVisible)}>
                <Text style={[
                    showStyles(colors).modalText,
                    {backgroundColor: 'red', borderRadius: 10, color:themeColors.DARK.HEADERTITLE},
                  ]}>{CONSTANTS.DELETE}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default React.memo(CustomList);
