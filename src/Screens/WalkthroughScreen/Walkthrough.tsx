import React from 'react';
import {
  View,
  Text,
  Image,
  StyleProp,
  ImageStyle,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import CustomButton from '../../Components/CustomButton/CustomButton';
import {NAVIGATION} from '../../Constants/navConstants';
import GoogleLogin from '../../Components/GoogleLogin/GoogleLogin';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {WalkthroughScreenProps} from '../../Navigation/routeTypes';
import {HOME, IMAGES, TITLE, WLKTHROUGH} from '../../Constants/strings';

const Walkthrough = ({navigation}: WalkthroughScreenProps) => {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  return (
    <ScrollView
      style={styles.wrapper(colors)}
      contentContainerStyle={{alignItems: 'center'}}>
      <Text style={styles.title(colors)}>{HOME.NOTES_APP}</Text>

      <Image
        source={IMAGES.DIARY}
        style={styles.img as StyleProp<ImageStyle>}
      />

      <Text style={styles.txt(colors)}>{WLKTHROUGH.SAVE_NOTES}</Text>

      <View style={styles.button}>
        <CustomButton
          handleButton={() => navigation.navigate(NAVIGATION.SIGNUP)}
          text={WLKTHROUGH.CREATE_ACCOUNT}
          disable={false}
        />

        <GoogleLogin />

        <View style={styles.loginButton}>
          <Text style={styles.loginTxt(colors)}>
            {WLKTHROUGH.HAVE_ACCOUNT}{' '}
            <Text
              onPress={() => navigation.navigate(NAVIGATION.LOGIN)}
              style={styles.login(colors)}>
              {TITLE.LOGIN}
            </Text>
          </Text>
        </View>
      </View>
      {/* </View> */}
    </ScrollView>
  );
};

export default Walkthrough;
