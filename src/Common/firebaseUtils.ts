import firestore from '@react-native-firebase/firestore';
import {
  COLLECTION,
  CONSTANTS,
  DEFAULT_NOTE,
  ERR_CONSOLE,
  ERR_MSG,
  ERR_TITLE,
} from '../Constants/strings';
import {CollectionItem} from './common';
import {showAlert} from './alert';

export const userDocRef = (uid: string) => {
  return firestore().collection(COLLECTION.USERS).doc(uid);
};

//Add Notes

export const updateNote = async (
  uid: string,
  label: string,
  itemID: string,
  title: string,
  desc: string,
) => {
  try {
    await userDocRef(uid).collection(label).doc(itemID).update({
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
    await userDocRef(uid).collection(label).add({
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
    await userDocRef(uid).collection(selectedCollection.text).add({
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
    const doc = await userDocRef(uid).get();
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
      await userDocRef(uid).set(
        {collections: updatedCollections},
        {merge: true},
      );
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
  const unsubscribe = userDocRef(uid).onSnapshot(snapshot => {
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
    await userDocRef(uid).collection(itemText).doc(itemUid).delete();
  } catch (error) {
    console.error(ERR_CONSOLE.DELETE_NOTE, error);
    throw error;
  }
};

//Custom Hook

export async function addDocumentsForUser(userUid: string) {
  const collections = [
    COLLECTION.PERSONAL,
    COLLECTION.ACADEMIC,
    COLLECTION.WORK,
    COLLECTION.OTHERS,
  ];

  const addDocumentPromises = collections.map(collectionName =>
    addDocumentToCollection(userUid, collectionName),
  );

  await Promise.all(addDocumentPromises);

  await userDocRef(userUid).set({
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
  await userDocRef(userUid)
    .collection(collectionName)
    .add({
      title: `Welcome to your ${collectionName} collection!`,
      desc: DEFAULT_NOTE.DESCRIPTION,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
}

//Custom List

export const removeCollectionFromFirestore = async (
  uid: string,
  collections: CollectionItem[],
  collName: string,
) => {
  const collectionItem = collections.find(
    collection => collection.text === collName,
  );
  const number = collectionItem ? collectionItem.number : 1;

  await userDocRef(uid).update({
    collections: firestore.FieldValue.arrayRemove({
      text: collName,
      number: number,
    }),
  });
};

export const handleDeleteCollection = async (
  uid: string,
  collections: CollectionItem[],
  collName: string,
  setCollections: React.Dispatch<React.SetStateAction<CollectionItem[]>>,
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (
    collName === COLLECTION.PERSONAL ||
    collName === COLLECTION.ACADEMIC ||
    collName === COLLECTION.WORK ||
    collName === COLLECTION.OTHERS
  ) {
    showAlert(ERR_TITLE.ACTION_NOT_ALLOWED, ERR_MSG.CANNOT_DELETE);
    setModalVisible(false);
    return;
  }
  try {
    const collectionRef = userDocRef(uid).collection(collName);
    const snapshot = await collectionRef.get();
    const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(deletePromises);
    removeCollectionFromFirestore(uid, collections, collName);
    setCollections(prevCollections =>
      prevCollections.filter(collection => collection.text !== collName),
    );

    setModalVisible(false);
  } catch (error) {
    console.error(ERR_CONSOLE.DELETE_COLLECTION, error);
  }
};

//Add Note

export const setCollection = async (
  collections: CollectionItem[],
  setCollections: React.Dispatch<React.SetStateAction<CollectionItem[]>>,
  newCollection: string,
  uid: string,
) => {
  const updatedCollections = [
    ...collections,
    {text: newCollection.trim(), number: 0},
  ];
  await userDocRef(uid).set(
    {
      collections: updatedCollections,
    },
    {merge: true},
  );
  setCollections(updatedCollections);
};
