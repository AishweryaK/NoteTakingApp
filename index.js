import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { store, persistor } from './src/Redux/Store/store';
import firestore from '@react-native-firebase/firestore';
import { PersistGate } from 'redux-persist/integration/react';
import { RealmProvider } from '@realm/react';
import { CollectionModel, ExampleModel, NotesModel } from './src/Common/database';


firestore().settings({persistence: false});

const NoteApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
    <RealmProvider schema={[ExampleModel, CollectionModel, NotesModel]} schemaVersion={1}>
    <App />
    </RealmProvider>
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => NoteApp);


