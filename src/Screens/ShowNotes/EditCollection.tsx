import React, {useRef, useState, useEffect} from 'react';
import {Text, TextInput, View, TouchableOpacity, Modal} from 'react-native';
import {useReduxSelector} from '../../Redux/Store/store';
import {
  commonColors,
  getThemeColors,
} from '../../Assets/Colors/themeColors';
import {
  ADDNOTE,
  COLLECTION,
  CONSTANTS,
  SHOW_NOTES,
} from '../../Constants/strings';
import {styles} from '../ChangePassword/styles';
import { EditCollProps } from './show_notes';
import { userDocRef } from '../../Common/firebaseUtils';

const EditCollection: React.FC<EditCollProps> = ({visible, onClose, label}) => {
  const {theme, uid} = useReduxSelector(state => state.user);
  const colors = getThemeColors(theme);
  const [emptyColl, setEmptyColl] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);
  const [existingErr, setExistingErr] = useState<boolean>(false);
  const [collection, setCollection] = useState<string>('');
  const [allCollections, setAllCollections] = useState<
  Array<{text: string; number: number}>
>([])

  useEffect(() => {
    const unsubscribe = userDocRef(uid).onSnapshot(snapshot => {
      if (snapshot.exists) {
        const userData = snapshot.data();
        if (userData?.collections) {
          setAllCollections(userData.collections);
        }
      }
    });

    return () => unsubscribe();
  }, [uid]);

  const handleClose = () => {
    onClose();
    setCollection('');
    setEmptyColl(false);
    setErr(false);
    setExistingErr(false);
  };

  const handleEdit = () => {
    const trimmedColl = collection.trim();
    if (trimmedColl === '') {
      setEmptyColl(true);
      return;
    }
    if(trimmedColl === label)
        {
            setErr(true);
            return;
        }
        const existingCollection = allCollections.find(
            collection =>
              collection.text.toLowerCase() === trimmedColl.toLowerCase(),
          );
          if(existingCollection)
            {
                setExistingErr(true);
                return;
            }
    setEmptyColl(false);
    setErr(false);
    setExistingErr(false);
    
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent(colors)}>
          <Text style={styles.modalTitle(colors)}>Edit Collection</Text>

          <TextInput
            style={styles.input(colors)}
            placeholder={SHOW_NOTES.EDIT_COLLECTION}
            value={collection}
            onChangeText={setCollection}
            placeholderTextColor={commonColors.GRAY}
            maxLength={20}
            onBlur={() => setEmptyColl(false)}
          />
          {emptyColl && collection === '' && (
            <Text style={{color:'red', paddingLeft:10, paddingTop:10}}>{ADDNOTE.ENTER_COLLECTION}</Text>
          )}
          {err && (
            <Text style={{color:'red', paddingLeft:10, paddingTop:10}}>New Collection name same as Current</Text>
          )}
          {existingErr && (
            <Text style={{color:'red', paddingLeft:10, paddingTop:10}}>Collection with same name already exists</Text>
          )}
          <View style={styles.buttonContainer}>
            {/* {isLoading ? (
            <View style={styles.activity}>
              <ActivityIndicator size={'large'} color={colors.BLUE} />
            </View>
          ) : ( */}
            <>
              <TouchableOpacity
                style={styles.button(colors)}
                onPress={handleClose}>
                <Text style={styles.buttonText(colors)}>
                  {CONSTANTS.CANCEL}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button(colors)}
                onPress={handleEdit}>
                <Text style={styles.buttonText(colors)}>
                  {SHOW_NOTES.EDIT_COLLECTION}
                </Text>
              </TouchableOpacity>
            </>
            {/* )} */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditCollection;
