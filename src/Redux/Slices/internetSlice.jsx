import { createSlice } from "@reduxjs/toolkit";
import { SLICE } from "../../Constants/strings";

const initialState = {
connection:null,
};

export const netInfo = createSlice({
  name: SLICE.INTERNET,
  initialState,
  reducers: {
    netConnection: (state, action) => {
      const { connection} = action.payload;
      state.connection = connection;
      console.log(state, 2324);
    },
  },
});

export const { netConnection } = netInfo.actions;
export default netInfo.reducer;