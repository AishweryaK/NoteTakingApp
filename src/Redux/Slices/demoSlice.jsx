import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: "",
  uid: "",
  email: "",
  photoURL: ""
};

export const userInfo = createSlice({
    name: "user",
    initialState,
    reducers : {
       saveUser: (state, action) => {
        const { displayName, uid, email, photoURL } = action.payload;
        // state.curr_user =  action.payload;
        state.displayName = displayName;
        state.uid = uid ;
        state.email = email ;
        state.photoURL = photoURL ;
        console.log(action.payload,2324534636)
        // return state.curr_user
        },
        clearUserData: (state, action) => {
          state.displayName =  "";
          state.uid =  "";
          state.email =  "";
          state.photoURL ="";
          },
    },
    
})

export const {saveUser, clearUserData} = userInfo.actions;
export default userInfo.reducer;