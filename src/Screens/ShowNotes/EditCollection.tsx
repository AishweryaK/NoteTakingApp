import React, {useState, useEffect} from 'react';
import {Text, TextInput, View, TouchableOpacity, Modal} from 'react-native';
import {useReduxSelector} from '../../Redux/Store/store';
import {commonColors, getThemeColors} from '../../Assets/Colors/themeColors';
import {ADDNOTE, CONSTANTS, SHOW_NOTES} from '../../Constants/strings';
import {styles} from '../ChangePassword/styles';
import {EditCollProps} from './show_notes';
import {handleEdit, userDocRef} from '../../Common/firebaseUtils';

const EditCollection: React.FC<EditCollProps> = ({
  visible,
  onClose,
  label,
  navigation,
}) => {
  const {theme, uid} = useReduxSelector(state => state.user);
  const colors = getThemeColors(theme);
  const [emptyColl, setEmptyColl] = useState<boolean>(false);
  const [existingErr, setExistingErr] = useState<boolean>(false);
  const [collection, setCollection] = useState<string>('');
  const [allCollections, setAllCollections] = useState<
    Array<{text: string; number: number}>
  >([]);

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
    setExistingErr(false);
  };

  const handleCollection = (text: string) => {
    setCollection(text);

    const existingCollection = allCollections.find(
      collection => collection.text.toLowerCase() === text.toLowerCase(),
    );
    if (existingCollection) {
      setExistingErr(true);
      return;
    } else setExistingErr(false);
  };

  const handleEditWrapper = async () => {
    await handleEdit(
      collection,
      label,
      allCollections,
      uid,
      navigation,
      setEmptyColl,
      setExistingErr,
      setAllCollections,
      handleClose,
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles(colors).modalContainer}>
        <View style={styles(colors).modalContent}>
          <Text style={styles(colors).modalTitle}>
            {SHOW_NOTES.EDIT_COLLECTION}
          </Text>

          <TextInput
            style={styles(colors).input}
            placeholder={SHOW_NOTES.EDIT_COLLECTION}
            value={collection}
            onChangeText={handleCollection}
            placeholderTextColor={commonColors.GRAY}
            maxLength={20}
            onBlur={() => setEmptyColl(false)}
          />
          {emptyColl && collection === '' && (
            <Text style={styles(colors).errorTxt}>
              {ADDNOTE.ENTER_COLLECTION}
            </Text>
          )}
          {existingErr && (
            <Text style={styles(colors).errorTxt}>
              {SHOW_NOTES.ALREADY_EXISTS}
            </Text>
          )}
          <View style={styles(colors).buttonContainer}>
            <TouchableOpacity
              style={styles(colors).button}
              onPress={handleClose}>
              <Text style={styles(colors).buttonText}>{CONSTANTS.CANCEL}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles(colors).button}
              onPress={handleEditWrapper}>
              <Text style={styles(colors).buttonText}>
                {SHOW_NOTES.EDIT_COLLECTION}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditCollection;
