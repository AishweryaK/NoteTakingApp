import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {homeStyles} from './homeStyle';
import CustomList from '../../Components/CustomList/CustomList';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors, themeColors} from '../../Assets/Colors/themeColors';
import {NAVIGATION} from '../../Constants/navConstants';
import {HomeProps} from '../../Navigation/routeTypes';
import {HOME, IMAGES} from '../../Constants/strings';
import { useRealm } from '@realm/react';
import { Book } from '../../Common/database';

function Home({navigation}: HomeProps) {
  const user = useReduxSelector(state => state.user);
  const colors = getThemeColors(user.theme);
  const realm = useRealm();



  // useEffect(() => {
  //   const addProfile = async () => {
  //     try {
  //       if (realm && !realm.isClosed) {
  //         realm.write(() => {
  //           realm.deleteAll();
  //         });
  //       }
  //     } catch (error) {
  //       console.error('Error adding profile:', error);
  //     }
  //   };

  //   addProfile();
  // }, [realm]);

  // console.log(realm.objects('Book'),"DHEWDEFH");

  return (
    <SafeAreaView style={homeStyles.safeArea(colors)}>
      <View style={homeStyles.outer}>
        <View style={homeStyles.inner}>
          <Text style={homeStyles.welcome(colors)}>
            {HOME.WELCOME} {user.displayName} !
          </Text>
          <Text style={homeStyles.title(colors)}>{HOME.NOTES_APP}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.ACCOUNT)}>
          <Image
            style={homeStyles.userImg(colors)}
            source={
              user.photoURL ? {uri: user.photoURL} : IMAGES.USER_IMG
            }
          />
        </TouchableOpacity>
      </View>

      {user.uid ? (
        <View style={homeStyles.view}>
          <CustomList navigation={navigation} />
        </View>
      ) : (
        <View>
          <ActivityIndicator size="large" color={themeColors.LIGHT.BLUE} />
        </View>
      )}
    </SafeAreaView>
  );
}

export default Home;
