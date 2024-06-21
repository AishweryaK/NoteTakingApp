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

  const handleCollection = (text :string) => {
    setCollection(text);

      const existingCollection = allCollections.find(
        collection => collection.text.toLowerCase() === text.toLowerCase(),
      );
      if (existingCollection) {
        setExistingErr(true);
        return;
      }
      else
      setExistingErr(false);
  } 

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
      <View style={styles.modalContainer}>
        <View style={styles.modalContent(colors)}>
          <Text style={styles.modalTitle(colors)}>
            {SHOW_NOTES.EDIT_COLLECTION}
          </Text>

          <TextInput
            style={styles.input(colors)}
            placeholder={SHOW_NOTES.EDIT_COLLECTION}
            value={collection}
            onChangeText={handleCollection}
            placeholderTextColor={commonColors.GRAY}
            maxLength={20}
            onBlur={() => setEmptyColl(false)}
          />
          {emptyColl && collection === '' && (
            <Text style={styles.errorTxt}>{ADDNOTE.ENTER_COLLECTION}</Text>
          )}
          {existingErr && (
            <Text style={styles.errorTxt}>{SHOW_NOTES.ALREADY_EXISTS}</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button(colors)}
              onPress={handleClose}>
              <Text style={styles.buttonText(colors)}>{CONSTANTS.CANCEL}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button(colors)}
              onPress={handleEditWrapper}>
              <Text style={styles.buttonText(colors)}>
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
