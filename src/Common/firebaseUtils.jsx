import firestore from '@react-native-firebase/firestore';

export async function addDocumentsForUser(userUid) {
    const collections = ['Personal', 'Academic', 'Work', 'Others'];
    
    const addDocumentPromises = collections.map(collectionName =>
        addDocumentToCollection(userUid, collectionName)
    );

    await Promise.all(addDocumentPromises);

    await firestore()
    .collection('users')
    .doc(userUid)
    .set({
        collections: data
    });
}
const data = [
    { text: "Personal", number: 1 },
    { text: "Academic", number: 1 },
    { text: "Work", number: 1 },
    { text: "Others", number: 1 },
];

async function addDocumentToCollection(userUid, collectionName) {
    await firestore()
        .collection('users')
        .doc(userUid)
        .collection(collectionName)
        .add({
            title: `Welcome to your ${collectionName} collection!`,
            desc: "This is where you write your description..."
        });
}
