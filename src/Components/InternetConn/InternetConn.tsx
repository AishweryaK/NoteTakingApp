import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {ERR_TITLE, INTERNET} from '../../Constants/strings';

function OfflineSign(): React.JSX.Element {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>{ERR_TITLE.INTERNET}</Text>
    </View>
  );
}

export default OfflineSign;
