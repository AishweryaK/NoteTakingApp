import firestore from '@react-native-firebase/firestore';
import { COLLECTION, DEFAULT_NOTE } from '../Constants/strings';

interface CollectionItem {
  text: string;
  number: number;
}

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
