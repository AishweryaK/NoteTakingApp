import {Alert} from 'react-native';

export const showAlert = (title: string, message: string | undefined) => {
  console.error(message,'ERROR')
  Alert.alert(title, message);
};
