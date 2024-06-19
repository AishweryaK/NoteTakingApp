import {StyleSheet} from 'react-native';
import { commonColors } from '../../Assets/Colors/themeColors';

export const styles = StyleSheet.create({
  wrapper: colors => ({
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BACKGROUND,
    paddingTop: 30,
  }),
  errorTxt: {
    fontSize: 12,
    color: commonColors.ERROR,
    paddingLeft: 5,
    // paddingRight:15,
    paddingBottom: 10,
    textAlign: 'left',
    paddingTop: 5,
    marginRight: 15,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 60,
  },
  margin: {
    marginBottom: 10,
  },
  view: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
});
