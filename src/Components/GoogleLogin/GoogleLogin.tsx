import React, {useEffect} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {buttonStyles} from '../CustomButton/styles';
import GoogleIcon from '../../Assets/Svgs/GoogleIcon';
import useAuthentication from '../CustomHook/CustomHook';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {showAlert} from '../../Common/alert';
import {CLIENT_ID, ERR_MSG, ERR_TITLE, GOOGLE} from '../../Constants/strings';

function GoogleLogin() {
  const {googleLoginCall} = useAuthentication();
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);
  const connection = useReduxSelector(state => state.internet.connection);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENT_ID.WEB,
    });
  }, []);

  const signInBTNPress = async () => {
    if (connection) {
      await googleLoginCall();
    } else showAlert(ERR_TITLE.INTERNET, ERR_MSG.REQUEST_FAILED);
  };

  return (
    <TouchableOpacity
      style={[
        buttonStyles.customButton(colors),
        buttonStyles.googleButton(colors),
      ]}
      onPress={signInBTNPress}>
      <GoogleIcon width={25} height={25} />
      <View style={buttonStyles.view}>
        <Text
          style={[
            buttonStyles.buttonText(colors),
            buttonStyles.googleTxt(colors),
          ]}>
          {' '}
          {GOOGLE.CONTINUE}{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default GoogleLogin;
