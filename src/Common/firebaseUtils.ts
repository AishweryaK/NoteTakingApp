import firestore from '@react-native-firebase/firestore';
import {COLLECTION, CONSTANTS, DEFAULT_NOTE, ERR_CONSOLE} from '../Constants/strings';
import { CollectionItem } from './common';

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

export const updateCollectionCount = async (
  uid: string,
  itemText: string,
  action: string,
) => {
  try {
    const collectionRef = firestore().collection(COLLECTION.USERS).doc(uid);
    const doc = await collectionRef.get();
    if (doc.exists) {
      const userData = doc.data();
      const updatedCollections = userData?.collections.map(
        (collection: {text: string; number: number}) => {
          if (collection.text === itemText) {
            const updatedNumber =
              action === CONSTANTS.INCREMENT
                ? collection.number + 1
                : collection.number - 1;
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

export const subscribeToUserCollections = (
  uid: string,
  setCollections: React.Dispatch<
    React.SetStateAction<Array<{text: string; number: number}>>
  >,
) => {
  const userDocRef = firestore().collection(COLLECTION.USERS).doc(uid);

  const unsubscribe = userDocRef.onSnapshot(snapshot => {
    if (snapshot.exists) {
      const userData = snapshot.data();
      if (userData?.collections) {
        setCollections(userData.collections);
      }
    }
  });

  return unsubscribe;
};

//Show Notes

export const deleteNote = async (
  uid: string,
  itemText: string,
  itemUid: string,
) => {
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

//Custom Hook

export async function addDocumentsForUser(userUid: string) {
  const collections = [COLLECTION.PERSONAL, COLLECTION.ACADEMIC, COLLECTION.WORK, COLLECTION.OTHERS];

  const addDocumentPromises = collections.map(collectionName =>
    addDocumentToCollection(userUid, collectionName),
  );

  await Promise.all(addDocumentPromises);

  await firestore().collection(COLLECTION.USERS).doc(userUid).set({
    collections: data,
  });
}
const data: CollectionItem[] = [
  {text: COLLECTION.PERSONAL, number: 1},
  {text: COLLECTION.ACADEMIC, number: 1},
  {text: COLLECTION.WORK, number: 1},
  {text: COLLECTION.OTHERS, number: 1},
];

async function addDocumentToCollection(
  userUid: string,
  collectionName: string,
) {
  await firestore()
    .collection(COLLECTION.USERS)
    .doc(userUid)
    .collection(collectionName)
    .add({
      title: `Welcome to your ${collectionName} collection!`,
      desc: DEFAULT_NOTE.DESCRIPTION,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}
