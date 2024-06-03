import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { dimensions } from '../Constants/utility';

function OfflineSign() {

  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: dimensions.height*0.033,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row',
    width : dimensions.width,

  },
  offlineText: { 
    color: '#fff',
    justifyContent:"center",
    alignItems:"center",
    textAlign:"center",
  }
});
export default OfflineSign;