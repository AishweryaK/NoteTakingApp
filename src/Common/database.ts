// import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
// import Realm, {ObjectSchema} from 'realm';

// export class Book extends Realm.Object<Book> {
//   author!: string;
//   pages!: number;

//   static schema: ObjectSchema = {
//     name: 'Book',
//     properties: {
//       author: 'string',
//       pages: 'int',
//     },
//   };
// }

// export class Collections extends Realm.Object<Collections> {
//   text!: string;
//   number!: number;

//   static schema: ObjectSchema = {
//     name: 'Collections',
//     properties: {
//       text: 'string',
//       number: 'int',
//     },
//   };
// }

// export class Notes extends Realm.Object<Notes> {
//   id!: string;
//   title!: string;
//   desc!: string;
//   createdAt!: FirebaseFirestoreTypes.Timestamp;
//   imageUrls!: string[];

//   static schema: ObjectSchema = {
//     name: 'Notes',
//     properties: {
//       id: 'string',
//       title: 'string',
//       desc: 'string',
//       createdAt: 'date',
//       imageUrls: 'string[]',
//     },
//   };
// }
// // Realm.deleteFile({path: '/data/data/com.chicmic.notetaking/files/default.realm'});
// let realm = new Realm({
//   schema: [Book],
//   schemaVersion: 1,
// });

// export default realm;

// import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
// import Realm, {ObjectSchema} from 'realm';

// export class Book extends Realm.Object<Book> {
//   author!: string;
//   pages!: number;

//   static schema: ObjectSchema = {
//     name: 'Book',
//     properties: {
//       author: 'string',
//       pages: 'int',
//     },
//   };
// }

// export class Collections extends Realm.Object<Collections> {
//   text!: string;
//   number!: number;

//   static schema: ObjectSchema = {
//     name: 'Collections',
//     properties: {
//       text: 'string',
//       number: 'int',
//     },
//   };
// }

// export class Notes extends Realm.Object<Notes> {
//     _id!: string;
//     createdAt!: string;
//     desc!: string;
//     imageUrls!: string;
//     title!: string;

//     static schema: ObjectSchema = {
//       name: 'Notes',
//       primaryKey: '_id',
//       properties: {
//         _id: 'string',
//         createdAt: 'date',
//         desc: 'string',
//         imageUrls: 'string[]',
//         title: 'string',
//         // collections: 'Collection[]',
//       },
//     };
//   }

// export class Collec extends Realm.Object<Collec> {
//   _id!:string;
//   collection!:string;
//   note!:Notes;

//   static schema: ObjectSchema = {
//     name:'Collec',
//     properties:{
//       note:'Notes',
//       collection:'string',
//     }
//   }
// }

// export class Notes extends Realm.Object<Notes> {
//   _id!: string;
//   createdAt!: FirebaseFirestoreTypes.Timestamp;
//   desc!: string;
//   imageUrls!: string[];
//   title!: string;

//   static schema: ObjectSchema = {
//     name: 'Notes',
//     primaryKey: '_id',
//     properties: {
//       _id: 'string',
//       createdAt: 'date',
//       desc: 'string',
//       imageUrls: 'string[]',
//       title: 'string',
//       // collections: 'Collection[]',
//     },
//   };
// }

// export class Notes extends Realm.Object <Book> {
//     text!:string;
//     number!:number;

//     static schema : ObjectSchema = {
//         name:'Collections',
//         properties : {
//             text:'string',
//             number:'int'
//         }
//     }
// }

// let realm = new Realm({schema: [Book], schemaVersion: 1});

// export default realm;

// Realm.deleteFile({ path: '/data/data/com.chicmic.notetaking/files/default.realm' });



import Realm, {ObjectSchema} from 'realm';

export class CollectionModel extends Realm.Object {
  text!: string;
  number!: number;

  static schema: ObjectSchema = {
    name: 'collections',
    properties: {
      text: 'string',
      number: 'int',
    },
  };
}

export class NotesModel extends Realm.Object {
  _id!: string;
  createdAt!: Date;
  desc!: string;
  imageUrls!: string[];
  title!: string;
  collection!: string;
  deleted!: boolean;

  static schema: ObjectSchema = {
    name: 'notes',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      createdAt: 'date',
      desc: 'string',
      imageUrls: 'string[]',
      title: 'string',
      collection: 'string',
      deleted: 'bool',
    },
  };
}

export class ExampleModel extends Realm.Object {
  name!: string;
  type!: string;
  static readonly schema: ObjectSchema = {
    name: 'exampleModel',
    properties: {
      name: 'string',
      type: 'string',
    },
  };
}

// export const schemaArray = [CollectionItemSchema, NoteSchema];

// const realm = new Realm({
//   schema: schemaArray,
//   schemaVersion: 2,
// });

// export default realm;

// let realm: Realm | null = null; // Keep track of the realm instance

// Function to initialize or reopen Realm
// export function openRealm() {
//   if (!realm || realm.isClosed) {
//     realm = new Realm({
//       schema: schemaArray,
//       schemaVersion: 2,
//     });
//     console.log("Realm is now open");
//   }
// }
// export default realm ;
