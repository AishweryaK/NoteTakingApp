import Realm, { ObjectSchema } from "realm";

export class Book extends Realm.Object <Book> {
    author!:string;
    pages!:number;

    static schema : ObjectSchema = {
        name:'Book',
        properties : {
            author:'string',
            pages:'int'
        }
    }
} 

export class Collections extends Realm.Object <Book> {
    text!:string;
    number!:number;

    static schema : ObjectSchema = {
        name:'Collections',
        properties : {
            text:'string',
            number:'int'
        }
    }
} 

export class Notes extends Realm.Object <Book> {
    text!:string;
    number!:number;

    static schema : ObjectSchema = {
        name:'Collections',
        properties : {
            text:'string',
            number:'int'
        }
    }
} 

// let realm = new Realm({schema: [BookSchema], schemaVersion: 1});

// export default realm;