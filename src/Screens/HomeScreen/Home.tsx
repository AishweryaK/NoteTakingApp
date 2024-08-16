import React, {useEffect, useMemo} from 'react';
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
import { useQuery } from '@realm/react';
import { CollectionModel, NotesModel } from '../../Common/database';

function Home({navigation}: HomeProps) {
  const user = useReduxSelector(state => state.user);
  const colors = getThemeColors(user.theme);
  const notes = useQuery(NotesModel);
  const collections = useQuery(CollectionModel)
  // const hello = useQuery(NotesModel)
  // const data = useMemo(
  //   () => [
  //     ...hello.filter(item => item.collection === 'Academic'),
  //   ],
  //   [hello],
  // );

  // console.log(data,"notesDATAAA")
  console.log(notes,"notes")
  console.log(collections,"collections")

// const options = {
//   timeZone: 'Asia/Kolkata',
//   year: 'numeric',      
//   month: 'long',        
//   day: 'numeric',       
//   hour: 'numeric',  
//   minute: 'numeric',    
//   second: 'numeric',     
//   hour12: true,         
// };
  
//   const formatter = new Intl.DateTimeFormat('en-US', options);
//   const timestamp = formatter.format(new Date());
  
//   console.log(timestamp,"ITMTESTMP");
//   const date = new Date();
//   console.log(date,"DATE")


  // const realm = useRealm();

  // console.log(realm,"REALM")
  // useEffect(() => {
  //   const addProfile = async () => {
  //     try {
  //       if (realm && !realm.isClosed) {
  //         // realm.write(() => {
  //           // realm.create(Collections, {
  //           //   text: 'Qwerty',
  //           //   number : 44,
  //           // });
  //           // realm.create(Book, {
  //           //   author: 'fvervef',
  //           //   pages : 2000,
  //           // });
  //           // realm.create(Notes, {
  //           //   _id: 'qjwh43i4h23fvfrRFR',
  //           //   createdAt: 'date',
  //           //   desc: 'string',
  //           //   imageUrls: 'string[]',
  //           //   title: 'string',
  //           // });
  //           // realm.deleteAll();
  //         // });
  //         // console.log(realm.objects('CollectionItem'), 'DHEWDEFH');
  //         // console.log(realm.objects('Note'), 'NOTESS');
  //       }
  //     } catch (error) {
  //       console.error('Error adding profile:', error);
  //     }
  //   };

  //   addProfile();
  // }, [realm]);

  // console.log(realm?.objects('CollectionItem'), 'DHEWDEFH');
  // console.log(realm.objects('Book'), '123WDEFH');
  // console.log(realm?.objects('Note'), 'NOTESS');

  return (
    <SafeAreaView style={homeStyles(colors).safeArea}>
      <View style={homeStyles(colors).outer}>
        <View style={homeStyles(colors).inner}>
          <Text style={homeStyles(colors).welcome}>
            {HOME.WELCOME} {user.displayName} !
          </Text>
          <Text style={homeStyles(colors).title}>{HOME.NOTES_APP}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.ACCOUNT)}>
          <Image
            style={homeStyles(colors).userImg}
            source={user.photoURL ? {uri: user.photoURL} : IMAGES.USER_IMG}
          />
        </TouchableOpacity>
      </View>

      {user.uid ? (
        <View style={homeStyles(colors).view}>
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
