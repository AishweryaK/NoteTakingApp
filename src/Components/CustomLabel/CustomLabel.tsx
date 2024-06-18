import React from 'react';
import {View, TouchableOpacity, Text, ImageBackground} from 'react-native';
import {styles} from './styles';
import {useReduxSelector} from '../../Redux/Store/store';
import {getThemeColors} from '../../Assets/Colors/themeColors';
import {ICONS} from '../../Constants/iconConstants';
import {CustomLabelProps} from './custom_label';
import {CUSTOM_LABEL, IMAGES, THEME} from '../../Constants/strings';

function CustomLabel({
  handlePress,
  text,
  number,
  handleLongPress,
}: CustomLabelProps) {
  const theme = useReduxSelector(state => state.user.theme);
  const colors = getThemeColors(theme);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.container}
      onLongPress={handleLongPress}>
      <ImageBackground
        source={theme === THEME.LIGHT ? IMAGES.LABEL_LIGHT : IMAGES.LABEL_DARK}
        style={styles.bg}>
        <View style={styles.icon}>
          {theme === THEME.LIGHT
            ? ICONS.NOTEBLUE(50, 50)
            : ICONS.NOTEWHITE(50, 50)}
        </View>
        <View style={styles.txtView}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.title(colors)}>
            {text}
          </Text>
          <Text style={styles.txt(colors)}>
            {number} {CUSTOM_LABEL.FILES}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default React.memo(CustomLabel);
