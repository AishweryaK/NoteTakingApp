import React from 'react';
import {
  View,
  Text,
  Image,
  StyleProp,
  ImageStyle,
} from 'react-native';
import {styles} from './styles';
import CustomButton from '../../Components/CustomButton/CustomButton';
import {NAVIGATION} from '../../Constants/navConstants';
import GoogleLogin from '../../Components/GoogleLogin/GoogleLogin';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {WalkthroughScreenProps} from '../../Navigation/routeTypes';



const Walkthrough = ({navigation}:WalkthroughScreenProps) => {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  return (
    <View style={styles.wrapper(colors)}>
      <Text style={styles.title(colors)}>Notes App</Text>

      <Image
        source={require('../../Assets/Images/Diary.png')}
        style={styles.img as StyleProp<ImageStyle>}
      />

      <Text style={styles.txt(colors)}>Save and share notes</Text>

      <View style={styles.button}>
        <CustomButton
          handleButton={() => navigation.navigate(NAVIGATION.SIGNUP)}
          text="Create Account"
          disable={false}
        />

        <GoogleLogin />

        <View style={styles.loginButton}>
          <Text style={styles.loginTxt(colors)}>
            Have an account?{' '}
            <Text
              onPress={() => navigation.navigate(NAVIGATION.LOGIN)}
              style={styles.login(colors)}>
              Log in
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Walkthrough;
