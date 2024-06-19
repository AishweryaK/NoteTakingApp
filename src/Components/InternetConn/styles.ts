import {StyleSheet} from 'react-native';
import {dimensions} from '../../Constants/utility';
import {commonColors} from '../../Assets/Colors/themeColors';

export const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: commonColors.RED,
    height: dimensions.height * 0.033,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: dimensions.width,
  },
  offlineText: {
    color: commonColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
