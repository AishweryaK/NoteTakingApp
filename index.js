import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { store, persistor } from './src/Redux/Store/store';
import { PersistGate } from 'redux-persist/integration/react';



const NoteApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
    <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => NoteApp);


