import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: colors => ({
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BACKGROUND,
    paddingTop: 30,
  }),
  errorTxt: {
    fontSize: 12,
    color: '#FF0D10',
    paddingHorizontal: 15,
    paddingBottom: 10,
    textAlign: 'left',
    paddingTop: 5,
    marginRight: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 60,
  },
  margin: {marginBottom: 10},
  view: {paddingHorizontal: 8, paddingBottom: 20},
});
