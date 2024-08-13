// import Realm from 'realm';

const CollectionSchema = {
  name: 'Collection',
  properties: {
    number: 'int',
    text: 'string',
  },
};

const DocumentSchema = {
  name: 'Document',
  primaryKey: '_id',
  properties: {
    _id: 'objectId?',
    createdAt: 'date',
    desc: 'string',
    imageUrls: 'string[]',
    title: 'string',
    // collections: 'Collection[]',
  },
};

const NotesSchema = {
    name: 'Notes',
    properties:{
        _id: 'string',
        createdAt: new Date(),
        desc:'string',
        imageUrls: 'string[]',
        title:'string',
        collections: 'Collection[]',
        document : 'Document[]'
    }

}

const schema = {
  name: 'collectionArray',
  primaryKey: 'id',
  properties:{
    notesArray: 'Notes[]',
    collection:''
  }
}

// let realm = new Realm({schema: [CollectionSchema, DocumentSchema]});
// export default realm;
