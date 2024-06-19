import {Alert} from 'react-native';

export const showAlert = (title: string, message: string | undefined) => {
  Alert.alert(title, message);
};
