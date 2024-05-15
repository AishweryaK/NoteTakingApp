import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ICONS } from '../../Constants/iconConstants';
import { FONT } from '../../Constants/fontConstants';
import auth from '@react-native-firebase/auth';
import { styles } from './styles';
import { NAVIGATION } from '../../Constants/navConstants';



const AccountPage = ({navigation}) => {
    const [user, setUser]= useState()

    useEffect(()=> {
        const unsubscribe = auth().onAuthStateChanged(user=>
            setUser(user)
        );
        return ()=> unsubscribe()
    },[])

    useEffect(()=> {
        console.log(user)
    },[user])
  return (
    <ScrollView style={styles.container}>
      <Text>
        hello
      </Text>
    </ScrollView>
  );
};



export default AccountPage;
