import firestore from '@react-native-firebase/firestore';

export async function addDocumentsForUser(userUid) {
    const collections = ['Personal', 'Academic', 'Work', 'Others'];
    
    const addDocumentPromises = collections.map(collectionName =>
        addDocumentToCollection(userUid, collectionName)
    );

    await Promise.all(addDocumentPromises);
}

async function addDocumentToCollection(userUid, collectionName) {
    await firestore()
        .collection('users')
        .doc(userUid)
        .collection(collectionName)
        .add({
            title: `Welcome to your ${collectionName} collection!`,
            desc: `This is where you write your description...`
        });
}
