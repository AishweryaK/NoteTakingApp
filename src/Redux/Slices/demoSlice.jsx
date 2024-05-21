import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  uid: "",
  email: "",
  photoURL: "",
  theme: "LIGHT",
  provider:""
};

export const userInfo = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      const { displayName, uid, email, photoURL, provider } = action.payload;
      state.displayName = displayName;
      state.uid = uid;
      state.email = email;
      state.photoURL = photoURL;
      state.provider = provider;
      console.log(state, 2324534636);
    },
    clearUserData: (state) => {
      state.displayName = "";
      state.uid = "";
      state.email = "";
      state.photoURL = "";
      state.theme = "LIGHT";
      state.provider="";
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "LIGHT" ? "DARK" : "LIGHT";
      console.log(state.theme,63637284)
    },
  },
});

export const { saveUser, clearUserData, toggleTheme } = userInfo.actions;
export default userInfo.reducer;
