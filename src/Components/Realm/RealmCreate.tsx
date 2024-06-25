import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRealm} from '@realm/react';
import {Book} from '../../Common/database';

function RealmCreate() {
  const realm = useRealm();

  const addProfile = () => {
    realm.write(() => {
      realm.create(Book, {
        author: 'aish',
        pages: 200,
      });
    });
  };

  return (
    <View>
      <Text></Text>
    </View>
  );
}

export default RealmCreate;
