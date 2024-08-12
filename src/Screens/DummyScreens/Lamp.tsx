import React from 'react';
import {View, Text} from 'react-native';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {styles} from './styles';
import {FEATURES} from '../../Constants/strings';

function Lamp() {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  return (
    <View style={styles(colors).view}>
      <Text style={styles(colors).text}>{FEATURES.NEW_FEATURES}</Text>
    </View>
  );
}

export default Lamp;
