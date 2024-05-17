import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ICONS } from '../../Constants/iconConstants';
import { FONT } from '../../Constants/fontConstants';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';
import { useSelector } from 'react-redux';



const AccountPage = ({navigation}) => {
const user = useSelector((state)=> state.user)
  return (
    <ScrollView style={styles.container}>
      <Text>
        hello {user.displayName}
      </Text>
    </ScrollView>
  );
};



export default AccountPage;
