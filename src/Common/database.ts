// // import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
// // import Realm, {ObjectSchema} from 'realm';

// // export class Book extends Realm.Object<Book> {
// //   author!: string;
// //   pages!: number;

// //   static schema: ObjectSchema = {
// //     name: 'Book',
// //     properties: {
// //       author: 'string',
// //       pages: 'int',
// //     },
// //   };
// // }

// // export class Collections extends Realm.Object<Collections> {
// //   text!: string;
// //   number!: number;

// //   static schema: ObjectSchema = {
// //     name: 'Collections',
// //     properties: {
// //       text: 'string',
// //       number: 'int',
// //     },
// //   };
// // }

// // export class Notes extends Realm.Object<Notes> {
// //   id!: string;
// //   title!: string;
// //   desc!: string;
// //   createdAt!: FirebaseFirestoreTypes.Timestamp;
// //   imageUrls!: string[];

// //   static schema: ObjectSchema = {
// //     name: 'Notes',
// //     properties: {
// //       id: 'string',
// //       title: 'string',
// //       desc: 'string',
// //       createdAt: 'date',
// //       imageUrls: 'string[]',
// //     },
// //   };
// // }
// // // Realm.deleteFile({path: '/data/data/com.chicmic.notetaking/files/default.realm'});
// // let realm = new Realm({
// //   schema: [Book],
// //   schemaVersion: 1,
// // });

// // export default realm;

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

//   // export class Notes extends Realm.Object<Notes> {
// //   _id!: string;
// //   createdAt!: FirebaseFirestoreTypes.Timestamp;
// //   desc!: string;
// //   imageUrls!: string[];
// //   title!: string;

// //   static schema: ObjectSchema = {
// //     name: 'Notes',
// //     primaryKey: '_id',
// //     properties: {
// //       _id: 'string',
// //       createdAt: 'date',
// //       desc: 'string',
// //       imageUrls: 'string[]',
// //       title: 'string',
// //       // collections: 'Collection[]',
// //     },
// //   };
// // }

// // Realm.deleteFile({ path: '/data/data/com.chicmic.notetaking/files/default.realm' });

// // export class Notes extends Realm.Object <Book> {
// //     text!:string;
// //     number!:number;

// //     static schema : ObjectSchema = {
// //         name:'Collections',
// //         properties : {
// //             text:'string',
// //             number:'int'
// //         }
// //     }
// // }

// // let realm = new Realm({schema: [Book], schemaVersion: 1});

// // export default realm;
