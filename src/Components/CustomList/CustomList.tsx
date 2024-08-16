import React, {useMemo, useState, useEffect, FC} from 'react';
import {View, TouchableOpacity, Text, FlatList, Modal} from 'react-native';
import CustomLabel from '../CustomLabel/CustomLabel';
import {NAVIGATION} from '../../Constants/navConstants';
import {useReduxSelector} from '../../Redux/Store/store';
import AvailSpace from '../../Screens/HomeScreen/AvailSpace';
import {showStyles} from '../../Screens/ShowNotes/styles';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {HomeProps} from '../../Navigation/routeTypes';
import {CONSTANTS, CUSTOM_LIST} from '../../Constants/strings';
import {styles} from './styles';
import {CollectionItem} from '../../Common/common';
import {handleDeleteCollection, userDocRef} from '../../Common/firebaseUtils';
import { useQuery, useRealm } from '@realm/react';
import { CollectionModel } from '../../Common/database';

const CustomList: FC<HomeProps> = ({navigation}) => {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const connection = useReduxSelector(state => state.internet.connection);
  const user = useReduxSelector(state => state.user);
  const colors = getThemeColors(user.theme);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [collName, setCollName] = useState<string>('');
  const realm = useRealm();
  const collectionsModel = useQuery(CollectionModel);

  // useEffect(() => {
  //   const unsubscribe = userDocRef(user.uid).onSnapshot(snapshot => {
  //     if (snapshot?.exists) {
  //       const userData = snapshot?.data();
  //       if (userData && userData.collections) {
  //         setCollections(userData.collections);
  //       }
  //     }
  //   });
  //   return () => unsubscribe();
  // }, [user.uid]);

  // useEffect(() => {
  //   if (connection) {
  //     console.log("CONNECTION")
  //     const unsubscribe = userDocRef(user.uid).onSnapshot(snapshot => {
  //       if (snapshot?.exists) {
  //         const userData = snapshot?.data();
  //         if (userData && userData.collections) {
  //           setCollections(userData.collections);
  //         }
  //       }
  //     });
  //     return () => unsubscribe();
  //   } else {
  //     console.log("DISCONNECTION")
  //     const validCollections = collectionsModel.filter(item => item.isValid());
  //     const localCollections = validCollections.map(item => ({
  //       text: item.text,
  //       number: item.number,
  //     }));
  //     setCollections(localCollections);
  //   }
  // }, [connection, user.uid, collectionsModel]);

  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchCollections = () => {
  //     if (connection) {
  //       const unsubscribe = userDocRef(user.uid).onSnapshot(snapshot => {
  //         if (snapshot?.exists && isMounted) {
  //           const userData = snapshot?.data();
  //           if (userData && userData.collections) {
  //             setCollections(userData.collections);
  //           }
  //         }
  //       });
  //       return () => unsubscribe();
  //     } else {
  //       if (realm && !realm.isClosed && isMounted) {
  //         const validCollections = collectionsModel.filter(item => item.isValid());
  //         const localCollections = validCollections.map(item => ({
  //           text: item.text,
  //           number: item.number,
  //         }));
  //         setCollections(localCollections);
  //       }
  //     }
  //   };

  //   fetchCollections();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [connection, user.uid, collectionsModel, realm]);


  useEffect(() => {  
    const fetchCollections = () => {
      if (connection) {
        const unsubscribe = userDocRef(user.uid).onSnapshot(snapshot => {
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

  }, [connection, user.uid, collectionsModel, realm]);

  useEffect(() => {
    if (realm && !realm.isClosed && collections.length > 0) {
      realm?.write(() => {
        collections.forEach(collection => {
          const existingCollection = realm.objectForPrimaryKey('collections', collection.text);
          if (!existingCollection) {
            realm.create('collections', {
              text: collection.text,
              number: collection.number,
            });
          } else if(existingCollection.number !== collection.number) {
            existingCollection.number = collection.number;
          }
        });
      });
    }
  }, [collections]);  
  

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
            <Text style={showStyles(colors).modalTitle}>
              {CUSTOM_LIST.DELETE_COLLETION}
            </Text>
            <Text style={showStyles(colors).modalMessage}>
              {CUSTOM_LIST.ARE_YOU_SURE} {collName} {CUSTOM_LIST.COLLECTION}
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
              <TouchableOpacity
                onPress={() =>
                  handleDeleteCollection(
                    user.uid,
                    collections,
                    collName,
                    setCollections,
                    setModalVisible,
                  )
                }>
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
    </>
  );
};

export default React.memo(CustomList);
