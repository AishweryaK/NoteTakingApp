import {ActivityIndicator, Alert} from 'react-native';
import { useReduxSelector } from '../Redux/Store/store';
import { getThemeColors } from '../Assets/Colors/themeColors';

export const showAlert = (title: string, message: string | undefined) => {
  Alert.alert(title, message);
};

// export const Indicator = () => {
//   const theme = useReduxSelector(state=>state.user.theme)
//   const colors = getThemeColors(theme);
//   return <ActivityIndicator size={'large'} color={colors.BLUE} />
// }
