import { createSlice } from "@reduxjs/toolkit";
import { SLICE, THEME } from "../../Constants/strings";

const initialState = {
  displayName: "",
  uid: "",
  email: "",
  photoURL: "",
  theme: THEME.LIGHT,
  provider:"",
};

export const userInfo = createSlice({
  name:SLICE.USER,
  initialState,
  reducers: {
    saveUser: (state, action) => {
      const { displayName, uid, email, photoURL, provider} = action.payload;
      state.displayName = displayName;
      state.uid = uid;
      state.email = email;
      state.photoURL = photoURL;
      state.provider = provider;
      console.log(state, 2324534636);
    },
    saveName :(state, action) => {
      const { displayName} = action.payload;
      state.displayName = displayName;
    },
    clearUserData: (state) => {
      state.displayName = "";
      state.uid = "";
      state.email = "";
      state.photoURL = "";
      state.theme = THEME.LIGHT;
      state.provider="";
    },
    toggleTheme: (state) => {
      state.theme = state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
      console.log(state.theme,63637284)
    },
  },
});

export const { saveUser, clearUserData, toggleTheme , saveName} = userInfo.actions;
export default userInfo.reducer;
