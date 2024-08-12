export type Theme = 'LIGHT' | 'DARK';

export interface ThemeColors {
  DARK_BLUE: string;
  GREEN: string;
  BLUE: string;
  LIGHT_BLUE: string;
  SKY: string;
  GRAY: string;
  WHITE: string;
  BACKGROUND: string;
  HEADERTITLE: string;
  TITLECOLOR: string;
  BORDER: string;
  WELCOME: string;
  PLACEHOLDER: string;
  ICON: string;
  ICONFOCUSED: string;
  SHADOW: string;
  BOTTOM: string;
  RED: string;
  CANCEL: string;
  INPUTBG: string;
  INPUTSHADOW: string;
}

export const commonColors = {
  RED: '#b52424',
  BGCOLOR: 'rgba(0, 0, 0, 0.7)',
  WHITE: '#FFFFFF',
  ERROR: 'red',
  GRAY: 'gray',
  CANCEL: '#4B5563',
};

export const themeColors = {
  LIGHT: {
    DARK_BLUE: '#292150',
    GREEN: '#72777A',
    BLUE: '#6B4EFF',
    LIGHT_BLUE: '#9990FF',
    SKY: '#E7E7FF',
    GRAY: '#F2F4F5',
    WHITE: '#FFFFFF',
    BACKGROUND: '#F9F8FD',
    HEADERTITLE: '#2A2251',
    TITLECOLOR: '#090A0A',
    BORDER: '#E3E5E5',
    WELCOME: '#B6B0D9',
    PLACEHOLDER: '#72777A',
    ICON: '#BEB9DD',
    ICONFOCUSED: '#2A2351',
    SHADOW: '#6B4EFF',
    BOTTOM: '#FFFFFF',
    RED: '#b52424',
    CANCEL: '#D1D5DB',
    INPUTBG: '#FFFFFF',
    INPUTSHADOW: '#6B4EFF',
  },

  DARK: {
    DARK_BLUE: '#EAE7FD',
    GREEN: '#72777A',
    BLUE: '#6B4EFF',
    LIGHT_BLUE: '#9990FF',
    SKY: '#E7E7FF',
    GRAY: '#F2F4F5',
    WHITE: '#EAE7FD',
    BACKGROUND: '#292B30',
    HEADERTITLE: '#FFFFFF',
    TITLECOLOR: '#ECECEC',
    BORDER: '#E3E5E5',
    WELCOME: '#FFFFFF',
    PLACEHOLDER: '#72777A',
    ICON: '#BEB9DD',
    ICONFOCUSED: '#2A2351',
    SHADOW: '#ECECEC',
    BOTTOM: '#383A41',
    RED: '#b52424',
    CANCEL: '#4B5563',
    INPUTBG: '#535559',
    INPUTSHADOW: 'none',
  },
};

export const getThemeColors = (theme: Theme): ThemeColors => {
  return theme === 'DARK' ? themeColors.DARK : themeColors.LIGHT;
};
