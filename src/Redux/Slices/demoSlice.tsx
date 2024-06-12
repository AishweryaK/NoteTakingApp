import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SLICE, THEME} from '../../Constants/strings';

export type Theme = "LIGHT" | "DARK";

export interface UserInfoState {
  displayName: string | null;
  uid: string;
  email: string ;
  photoURL: string | null;
  theme: Theme;
  provider: string;
}

const initialState: UserInfoState = {
  displayName: '',
  uid: '',
  email: '',
  photoURL: '',
  theme: THEME.LIGHT as Theme,
  provider: '',
};

export const userInfo = createSlice({
  name: SLICE.USER,
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserInfoState>) => {
      const {displayName, uid, email, photoURL, provider} = action.payload;
      state.displayName = displayName;
      state.uid = uid;
      state.email = email;
      state.photoURL = photoURL;
      state.provider = provider;
    },
    saveName: (state, action: PayloadAction<{displayName: string}>) => {
      const {displayName} = action.payload;
      state.displayName = displayName;
    },
    clearUserData: state => {
      state.displayName = '';
      state.uid = '';
      state.email = '';
      state.photoURL = '';
      state.theme = THEME.LIGHT as Theme;
      state.provider = '';
    },
    toggleTheme: state => {
      state.theme = state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    },
  },
});

export const {saveUser, clearUserData, toggleTheme, saveName} =
  userInfo.actions;
export default userInfo.reducer;
