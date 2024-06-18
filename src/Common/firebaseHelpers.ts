import firestore from '@react-native-firebase/firestore';
import {COLLECTION, CONSTANTS, ERR_CONSOLE} from '../Constants/strings';

//Add Notes

export const updateNote = async (
  uid: string,
  label: string,
  itemID: string,
  title: string,
  desc: string,
) => {
  try {
    await firestore()
      .collection(COLLECTION.USERS)
      .doc(uid)
      .collection(label)
      .doc(itemID)
      .update({
        title,
        desc,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error(ERR_CONSOLE.SAVE_NOTE, error);
  }
};

export const saveNoteLabel = async (
  uid: string,
  label: string,
  title: string,
  desc: string,
) => {
  try {
    await firestore()
      .collection(COLLECTION.USERS)
      .doc(uid)
      .collection(label)
      .add({
        title,
        desc,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error(ERR_CONSOLE.SAVE_NOTE, error);
  }
};

export const saveNoteNew = async (
  uid: string,
  selectedCollection: {text: string},
  title: string,
  desc: string,
) => {
  try {
    await firestore()
      .collection(COLLECTION.USERS)
      .doc(uid)
      .collection(selectedCollection.text)
      .add({
        title,
        desc,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error(ERR_CONSOLE.SAVE_NOTE, error);
  }
};

export const updateCollectionCount = async (uid: string, itemText: string, action: string) => {
  try {
    const collectionRef = firestore().collection(COLLECTION.USERS).doc(uid);
    const doc = await collectionRef.get();
    if (doc.exists) {
      const userData = doc.data();
      const updatedCollections = userData?.collections.map(
        (collection: {text: string; number: number}) => {
          if (collection.text === itemText) {
            const updatedNumber = action === CONSTANTS.INCREMENT ? collection.number + 1 : collection.number - 1;
            return {
              ...collection,
              number: updatedNumber,
            };
          }
          return collection;
        },
      );
      await collectionRef.set({collections: updatedCollections}, {merge: true});
    }
  } catch (error) {
    throw error;
  }
};


//Show Notes

export const deleteNote = async (uid: string, itemText: string, itemUid: string) => {
  try {
    await firestore()
      .collection(COLLECTION.USERS)
      .doc(uid)
      .collection(itemText)
      .doc(itemUid)
      .delete();
  } catch (error) {
    console.error(ERR_CONSOLE.DELETE_NOTE, error);
    throw error;
  }
};

